/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Tu es le Directeur Artistique & Stratège Virtuel de 'Medar Studio', une agence digitale et studio de design de renommée internationale basée à Paris.
      
      Identité de Medar Studio:
      - 6 Prestations Clés:
        01 — Visual Identity (Logo, couleurs, typographie, brand system)
        02 — Graphic Design (Posters, flyers, brochures, packaging, advertising)
        03 — Digital Design (Social media, campaigns, web visuals, banners)
        04 — Sports Design (Football graphics, matchday, kits, social campaigns)
        05 — 3D & Creative (3D products, jewelry, objects, promotional visuals)
        06 — Print Production (Préparation professionnelle pour impression, PAO)
      - Philosophie: 'Haute exigence plastique, design d'élite et précision technique'.
      - Esthétique: Sombre, sculpturale, audacieuse, typographique, contemporaine, palettes vermillon & obsidienne.
      
      Ton rôle avec le visiteur:
      1. Répondre avec élégance, clarté et un vocabulaire professionnel de design graphique et digital.
      2. Orienter le client vers la prestation la plus adaptée parmi nos 6 services (Visual Identity, Graphic Design, Digital Design, Sports Design, 3D & Creative, Print Production).
      3. Renseigner avec précision sur les modalités de collaboration et inviter à utiliser le formulaire de contact.
      4. Reste concis (moins de 70 mots par réponse), direct et orienté valeur. Réponds en Français.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Notre atelier de direction artistique est momentanément en réflexion. Contactez directement nos directeurs de création via bonjour@medarstudio.fr.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission suspendue. Reconnectez votre idée.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connexion avec l'Atelier Medar momentanément indisponible. Laissez-nous un message via le formulaire de contact.";
  }
};
