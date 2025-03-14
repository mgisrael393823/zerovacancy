
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { EmailInput } from "./email-input";
import { SocialProof } from "./social-proof";
import { SuccessConfirmation } from "./success-confirmation";
import { supabase } from "@/integrations/supabase/client";

export function WaitlistButton({
  source = "unknown",
  className,
  children,
  buttonText = "JOIN WAITLIST",
  onClick
}: {
  source?: string;
  className?: string;
  children?: React.ReactNode;
  buttonText?: string;
  onClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    
    try {
      // Collect metadata
      const metadata = {
        referrer: document.referrer,
        url: window.location.href,
        userAgent: navigator.userAgent,
        source,
        timestamp: new Date().toISOString(),
      };
      
      // Call our Supabase Edge Function
      const { error, data } = await supabase.functions.invoke('submit-waitlist-email', {
        body: { 
          email, 
          source, 
          marketingConsent: true,
          metadata
        }
      });
      
      if (error) {
        console.error("Error submitting email:", error);
        toast.error("Failed to join the waitlist. Please try again later.");
        return;
      }
      
      // Handle already subscribed message
      if (data?.status === 'already_subscribed') {
        // Instead of a toast, show confirmation dialog with special message
        setSubmittedEmail(email);
        setAlreadySubscribed(true);
        setShowSuccess(true);
        setOpen(false);
      } else {
        // Store the email for the success confirmation
        setSubmittedEmail(email);
        setAlreadySubscribed(false);
        
        // Show success confirmation with confetti
        console.log("Showing success confirmation with email:", email);
        setShowSuccess(true);
        
        // Close the input form
        setOpen(false);
      }
      
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      toast.error("Failed to join the waitlist. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    console.log("WaitlistButton handleButtonClick triggered");
    
    // If custom onClick is provided, call it instead of the default behavior
    if (onClick) {
      console.log("Executing custom onClick handler from props");
      e.stopPropagation();
      onClick();
      return;
    }
    
    // Default behavior: open the email form
    console.log("Opening email form (default behavior)");
    e.stopPropagation();
    setOpen(true);
    
    // Focus the input after a short delay
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {!open ? (
        <div 
          className="w-full" 
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {children ? (
            <div 
              onClick={handleButtonClick}
              onTouchStart={(e) => {
                console.log("Touch event on WaitlistButton children");
                e.stopPropagation();
              }}
              className="w-full cursor-pointer"
            >
              {children}
            </div>
          ) : (
            <Button 
              className={cn(
                "w-full py-6 text-base font-medium font-jakarta",
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                isMobile ? "text-sm" : "text-base"
              )}
              type="button"
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full" id="waitlist-form">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <EmailInput
              setEmail={setEmail}
              email={email}
              isLoading={loading}
              disabled={loading}
              className="flex-grow"
              inputRef={inputRef}
            />
            <Button 
              type="submit" 
              disabled={loading} 
              className={cn(
                "h-12 sm:min-w-[130px] font-medium text-white",
                "bg-gradient-to-r from-indigo-600 to-purple-600",
                "hover:from-indigo-700 hover:to-purple-700",
                "transition-all duration-200 ease-in-out",
                isMobile && "min-h-[48px]"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                buttonText
              )}
            </Button>
          </div>
        </form>
      )}
      
      {/* Success Confirmation with Confetti Effect */}
      <SuccessConfirmation 
        open={showSuccess} 
        onOpenChange={setShowSuccess}
        email={submittedEmail}
        alreadySubscribed={alreadySubscribed}
      />
    </div>
  );
};
