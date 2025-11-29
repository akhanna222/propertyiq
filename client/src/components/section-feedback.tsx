import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { SectionFeedbackInput } from "@shared/schema";

interface SectionFeedbackProps {
  sectionName: string;
  sectionTitle: string;
  propertyAddress: string;
  propertyEircode?: string;
}

export function SectionFeedback({ 
  sectionName, 
  sectionTitle, 
  propertyAddress, 
  propertyEircode 
}: SectionFeedbackProps) {
  const [feedbackText, setFeedbackText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const feedbackMutation = useMutation({
    mutationFn: async (feedback: SectionFeedbackInput) => {
      const response = await apiRequest("POST", "/api/section-feedback", feedback);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! We'll use it to improve our analysis.",
      });
      setFeedbackText("");
      setIsOpen(false);
      // Invalidate feedback queries to refresh any displayed feedback
      queryClient.invalidateQueries({ queryKey: ["/api/section-feedback"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error submitting feedback",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      toast({
        title: "Feedback required",
        description: "Please enter your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }

    feedbackMutation.mutate({
      sectionName,
      propertyAddress,
      propertyEircode,
      feedbackText: feedbackText.trim(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
        >
          <MessageCircle size={16} />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle size={20} className="text-blue-600" />
            Feedback on {sectionTitle}
          </DialogTitle>
          <DialogDescription>
            Help us improve our property analysis by sharing your thoughts on this section.
            What additional information would be helpful?
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="feedback-text" className="text-sm font-medium">
              Your feedback
            </label>
            <Textarea
              id="feedback-text"
              placeholder="What additional information would you like to see in this section? Any suggestions for improvement?"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={feedbackMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={feedbackMutation.isPending || !feedbackText.trim()}
              className="flex items-center gap-2"
            >
              {feedbackMutation.isPending ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Feedback
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}