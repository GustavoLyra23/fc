import { Router } from "express";
import { PartnerService } from "../services/partner-service";
import { EventService } from "../services/event-service";

export const partnerRoutes = Router();

partnerRoutes.post("/register", async (req, res) => {
  const { name, email, password, company_name } = req.body;
  try {
    const partnerService = new PartnerService();
    const result = await partnerService.register({
      name,
      email,
      password,
      company_name,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

partnerRoutes.post("/events", async (req, res) => {
  const { name, description, date, location } = req.body;
  const userId = req.user!.id;
  const partnerService = new PartnerService();
  const partner = await partnerService.findByUserId(userId);

  if (!partner) {
    res.status(403).json({ message: "Not authorized" });
    return;
  }
  const eventService = new EventService();
  const result = await eventService.create({
    name,
    description,
    date: new Date(date),
    location,
    partnerId: partner.id,
  });
  res.status(201).json(result);
});

partnerRoutes.get("/events", async (req, res) => {
  const userId = req.user!.id;
  const partnerService = new PartnerService();
  const partner = await partnerService.findByUserId(userId);

  if (!partner) {
    res.status(403).json({ message: "Not authorized" });
    return;
  }

  const eventService = new EventService();
  const result = await eventService.findAll(partner.id);
  res.json(result);
});

partnerRoutes.get("/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user!.id;

  const partnerService = new PartnerService();
  const partner = await partnerService.findByUserId(userId);

  if (!partner) {
    res.status(403).json({ message: "Not authorized" });
    return;
  }

  const eventService = new EventService();
  const event = await eventService.findById(+eventId);

  if (!event || event.partner_id !== partner.id) {
    res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
});
