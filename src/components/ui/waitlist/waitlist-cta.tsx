
"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { EmailInput } from "./email-input";
import { WaitlistButton } from "./waitlist-button";
import { SocialProof } from "./social-proof";
import { SuccessConfirmation } from "./success-confirmation";
import { supabase } from "@/integrations/supabase/client";

export function WaitlistCTA({
  className,
  source = "landing_page"
}: {
  className?: string;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      inputRef.current?.focus();
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Collect additional metadata about the signup
      const metadata = {
        referrer: document.referrer,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };
      
      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('submit-waitlist-email', {
        body: { 
          email, 
          source, 
          marketingConsent: true, 
          metadata 
        }
      });
      
      if (error) {
        console.error("Error submitting email:", error);
        toast.error("Failed to join waitlist. Please try again.");
        return;
      }
      
      // Handle already subscribed message
      if (data?.status === 'already_subscribed') {
        // Instead of a toast, show confirmation dialog with special message
        setSubmittedEmail(email);
        setAlreadySubscribed(true);
        setShowSuccess(true);
      } else {
        // Store the email for the success confirmation
        setSubmittedEmail(email);
        setAlreadySubscribed(false);
        
        // Show success confirmation with confetti
        console.log("Showing success confirmation with email:", email);
        setShowSuccess(true);
      }
      
      // Clear the email field on success
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={cn("w-full max-w-xl mx-auto px-4 sm:px-0", className)} id="mobile-hero-cta-section">
      <form onSubmit={handleSubmit} className={cn("flex w-full", isMobile ? "flex-col space-y-4" : "flex-row items-center justify-center gap-4")}>
        <EmailInput 
          email={email}
          setEmail={setEmail}
          isLoading={isLoading}
          inputRef={inputRef}
        />
        
        {/* Fixed: Removed the isLoading prop */}
        <WaitlistButton 
          source={source}
          buttonText="JOIN WAITLIST"
        />
      </form>
      
      {/* Social Proof Section - Always visible with reserved space */}
      <div style={{ 
        minHeight: isMobile ? '40px' : 'auto', 
        marginTop: isMobile ? '8px' : '12px', 
        position: 'relative'
      }}>
        <SocialProof />
      </div>

      {/* Success Confirmation with Confetti Effect */}
      <SuccessConfirmation 
        open={showSuccess} 
        onOpenChange={setShowSuccess}
        email={submittedEmail}
        alreadySubscribed={alreadySubscribed}
      />
    </div>
  );
}
