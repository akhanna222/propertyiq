import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, ExternalLink, Filter } from 'lucide-react';

interface PropertyRegisterEntry {
  id: number;
  address: string;
  county: string;
  eircode: string;
  price: number;
  saleDate: string;
  description: string;
  year: number;
}

interface PropertyDataTableProps {
  address: string;
  county?: string;
  eircode?: string;
  isLoading?: boolean;
}

export function PropertyDataTable({ address, county, eircode, isLoading = false }: PropertyDataTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PropertyRegisterEntry[]>([]);
  const [filteredData, setFilteredData] = useState<PropertyRegisterEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const fetchPropertyData = async () => {
    if (data.length > 0) return; // Already loaded
    
    setLoading(true);
    try {
      const response = await fetch('/api/property-register-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, county, eircode })
      });
      
      if (response.ok) {
        const result = await response.json();
        const records = result.data || [];
        setData(records);
        setFilteredData(records);
        
        // Auto-select the most recent year if available  
        if (records.length > 0) {
          const allYears = records.map((r: PropertyRegisterEntry) => Number(r.year));
          const uniqueYears: number[] = [];
          allYears.forEach((year: number) => {
            if (!uniqueYears.includes(year)) {
              uniqueYears.push(year);
            }
          });
          const sortedYears = uniqueYears.sort((a, b) => b - a);
          
          if (sortedYears.length > 0) {
            const mostRecentYear = sortedYears[0];
            setSelectedYear(mostRecentYear.toString());
            const filtered = records.filter((record: PropertyRegisterEntry) => Number(record.year) === mostRecentYear);
            setFilteredData(filtered);
            console.log(`Auto-selected year ${mostRecentYear} with ${filtered.length} records`);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch property register data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data by year
  const handleYearFilter = (year: string) => {
    setSelectedYear(year);
    if (year === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(record => {
        const recordYear = Number(record.year);
        const filterYear = Number(year);
        return recordYear === filterYear;
      });
      setFilteredData(filtered);
      console.log(`Filtered by year ${year}: ${filtered.length} records found`);
    }
  };

  // Get unique years from data for filter dropdown
  const availableYears = Array.from(new Set(data.map(record => Number(record.year)))).sort((a, b) => b - a);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      fetchPropertyData();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          disabled={isLoading}
        >
          <Database className="h-4 w-4" />
          View Raw Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Sold Property Records
            <span className="text-sm font-normal text-muted-foreground">
              for "{address}"
            </span>
          </DialogTitle>
        </DialogHeader>
        
        {/* Year Filter */}
        {availableYears.length > 1 && (
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by Year:</span>
            </div>
            <Select value={selectedYear} onValueChange={handleYearFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {availableYears.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Data Summary */}
        {data.length > 0 && (
          <div className="flex items-center justify-between py-2 px-1 text-sm text-muted-foreground border-b">
            <span>
              Showing {filteredData.length} of {data.length} records
              {selectedYear !== "all" && ` for ${selectedYear}`}
            </span>
            <span>
              Years available: {availableYears.join(', ')}
            </span>
          </div>
        )}
        
        <ScrollArea className="h-[500px] w-full">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Loading property records...</span>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {data.length === 0 
                ? "No sold property records found for this address"
                : `No records found for ${selectedYear === "all" ? "selected filter" : selectedYear}`
              }
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sale Date</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>County</TableHead>
                  <TableHead>Eircode</TableHead>
                  <TableHead className="text-right">Price (€)</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm">
                      {new Date(record.saleDate).toLocaleDateString('en-IE')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {record.address}
                    </TableCell>
                    <TableCell>{record.county}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {record.eircode}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      €{(record.price / 100).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {filteredData.length > 0 && (
              selectedYear === "all" 
                ? `${filteredData.length} records found`
                : `${filteredData.length} records found for ${selectedYear} ${data.length > filteredData.length ? `(${data.length} total)` : ''}`
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ExternalLink className="h-3 w-3" />
            Data source: Official Irish Property Register
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}