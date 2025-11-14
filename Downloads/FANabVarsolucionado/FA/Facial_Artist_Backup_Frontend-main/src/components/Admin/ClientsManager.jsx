import React, { useState } from "react";
import {
  Search,
  User,
  Phone,
  Mail,
  Calendar,
  Eye,
  Edit3,
  Plus,
} from "lucide-react";
//import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/Admin/button";
import "./ClientsManager.css";

export function ClientsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "María González",
      phone: "+57 301 555 0123",
      email: "maria@email.com",
      lastVisit: "2025-01-15",
      totalAppointments: 8,
      totalSpent: 850000,
      trafficLight: "green",
    },
    {
      id: 2,
      name: "Ana Rodríguez",
      phone: "+57 302 555 0145",
      email: "ana@email.com",
      lastVisit: "2025-01-17",
      totalAppointments: 5,
      totalSpent: 520000,
      trafficLight: "yellow",
    },
    {
      id: 3,
      name: "Carmen López",
      phone: "+57 300 888 0178",
      email: "carmen@email.com",
      lastVisit: "2025-01-20",
      totalAppointments: 3,
      totalSpent: 380000,
      trafficLight: "red",
    },
  ]);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrafficLightColor = (color) => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="clients-container">
      <Card className="border-rose-pastel bg-white shadow-md">
        <CardHeader>
          <div className="header-flex">
            <CardTitle className="font-heading text-black-soft">
              Clientas
            </CardTitle>
            <Button className="btn-gold">
              <Plus className="h-4 w-4 mr-2" /> Nueva clienta
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar clienta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="clients-list">
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            className="border-rose-pastel hover:shadow-lg transition-all bg-white"
          >
            <CardContent className="client-card">
              <div className="client-header">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${getTrafficLightColor(
                      client.trafficLight
                    )}`}
                  ></div>
                  <h3 className="client-name">{client.name}</h3>
                </div>
                <Button className="btn-outline">
                  <Eye className="h-4 w-4 mr-2" /> Ver perfil
                </Button>
              </div>
              <div className="client-info">
                <p>
                  <Phone className="icon" /> {client.phone}
                </p>
                <p>
                  <Mail className="icon" /> {client.email}
                </p>
                <p>
                  <Calendar className="icon" /> Última cita: {client.lastVisit}
                </p>
                <p>
                  Citas totales: <strong>{client.totalAppointments}</strong> ·{" "}
                  Gastado:{" "}
                  <strong>
                    {client.totalSpent.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    })}
                  </strong>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
