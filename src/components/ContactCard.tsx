import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function ContactCard() {
  const [message, setMessage] = useState("");

  const handleRedirect = () => {
    const formatted = encodeURIComponent(message.trim());
    window.open(`https://wa.me/558597095694?text=${formatted}`, "_blank");
  };

  return (
    <section id="contact" className="text-primary py-16 sm:px-6" data-aos="fade-up">
      <div className="max-w-xl mx-auto">
        <Card className="bg-background p-8 rounded-2xl shadow-md">
          <CardHeader className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-6 h-6 text-green-500" />
            <CardTitle className="text-2xl font-bold">Entre em Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-base">Preencha sua mensagem e fale conosco pelo WhatsApp com apenas um clique.</p>
            <Textarea
              placeholder="Digite sua mensagem aqui..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mb-4 focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500/50"
            />
            <Button
              onClick={handleRedirect}
              className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-base text-primary"
              disabled={!message.trim()}
            >
              Enviar via WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}