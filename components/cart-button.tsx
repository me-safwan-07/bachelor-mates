"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartButtonProps {
  itemId: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function CartButton({ itemId, variant = "outline", size = "icon" }: CartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addToCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity: 1 }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={addToCart}
      disabled={isLoading}
      className="ml-2"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="sr-only">Add to cart</span>
    </Button>
  );
}