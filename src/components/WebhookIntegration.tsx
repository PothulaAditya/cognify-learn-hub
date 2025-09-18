import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Zap, Send, Loader2 } from "lucide-react";

const WebhookIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState("https://your-ngrok-url.ngrok.io/webhook-test/df79ac89-b5c8-4872-b84c-083d0d3a3c97");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          app: "Cognify",
          action: "webhook_trigger",
        }),
      });

      toast({
        title: "Agent Triggered",
        description: "Your agent webhook has been successfully triggered!",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Zap className="h-5 w-5 text-primary" />
          Agent Integration
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Connect and trigger your AI agent webhook
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrigger} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="webhook-url" className="text-sm font-medium text-card-foreground">
              Agent Webhook URL
            </label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="Enter your webhook URL..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="bg-input border-border text-foreground"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Triggering Agent...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Trigger Agent
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WebhookIntegration;