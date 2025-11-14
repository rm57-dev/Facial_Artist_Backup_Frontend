// import { useState } from "react";
// import {
//   Bell,
//   Mail,
//   MessageSquare,
//   Settings,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Send,
//   RefreshCw,
// } from "lucide-react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { Switch } from "../ui/switch";
// import { Label } from "../ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Separator } from "../ui/separator";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import "./ReminderSettings.css";

// export default function ReminderSettings() {
//   const [settings, setSettings] = useState({
//     emailEnabled: true,
//     smsEnabled: true,
//     defaultTimeframe: "24h",
//     customMessage:
//       "Hola {{nombre}}, te recordamos tu cita de {{servicio}} el {{fecha}} a las {{hora}}.",
//   });

//   const [reminders] = useState([
//     {
//       id: "1",
//       clientName: "María González",
//       service: "Microblading",
//       date: "2025-01-21",
//       time: "10:00",
//       channel: "email",
//       timeframe: "24h",
//       status: "pending",
//       scheduledFor: "2025-01-20 10:00",
//     },
//     {
//       id: "2",
//       clientName: "Ana López",
//       service: "Extensiones de Pestañas",
//       date: "2025-01-21",
//       time: "14:00",
//       channel: "sms",
//       timeframe: "24h",
//       status: "sent",
//       scheduledFor: "2025-01-20 14:00",
//     },
//     {
//       id: "3",
//       clientName: "Carmen Silva",
//       service: "Laminado de cejas",
//       date: "2025-01-22",
//       time: "11:00",
//       channel: "email",
//       timeframe: "12h",
//       status: "pending",
//       scheduledFor: "2025-01-21 23:00",
//     },
//   ]);

//   const handleSettingsChange = (key, value) => {
//     setSettings((prev) => ({ ...prev, [key]: value }));
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "badge-yellow";
//       case "sent":
//         return "badge-green";
//       case "failed":
//         return "badge-red";
//       default:
//         return "badge-gray";
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case "pending":
//         return "Pendiente";
//       case "sent":
//         return "Enviado";
//       case "failed":
//         return "Falló";
//       default:
//         return status;
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "pending":
//         return <Clock className="icon-sm" />;
//       case "sent":
//         return <CheckCircle className="icon-sm" />;
//       case "failed":
//         return <AlertCircle className="icon-sm" />;
//       default:
//         return <Clock className="icon-sm" />;
//     }
//   };

//   const formatDateTime = (dateTimeString) =>
//     new Date(dateTimeString).toLocaleString("es-ES", {
//       day: "numeric",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const pendingReminders = reminders.filter((r) => r.status === "pending");
//   const sentReminders = reminders.filter((r) => r.status === "sent");
//   const failedReminders = reminders.filter((r) => r.status === "failed");

//   return (
//     <div className="reminder-container">
//       {/* Configuración general */}
//       <Card className="card-settings">
//         <CardHeader>
//           <CardTitle className="title-header">
//             <Settings className="icon-gold" />
//             Configuración de Recordatorios
//           </CardTitle>
//           <CardDescription>
//             Configura cómo y cuándo se envían los recordatorios automáticos
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y">
//           {/* Canales de comunicación */}
//           <div className="channels">
//             <h3>Canales de Comunicación</h3>
//             <div className="channel-grid">
//               {/* Email */}
//               <div className="channel-card">
//                 <div className="channel-info">
//                   <Mail className="icon-gold" />
//                   <div>
//                     <Label>Email</Label>
//                     <p>Recordatorios por correo electrónico</p>
//                   </div>
//                 </div>
//                 <Switch
//                   checked={settings.emailEnabled}
//                   onCheckedChange={(value) => handleSettingsChange("emailEnabled", value)}
//                 />
//               </div>

//               {/* SMS */}
//               <div className="channel-card">
//                 <div className="channel-info">
//                   <MessageSquare className="icon-gold" />
//                   <div>
//                     <Label>SMS</Label>
//                     <p>Recordatorios por mensaje de texto</p>
//                   </div>
//                 </div>
//                 <Switch
//                   checked={settings.smsEnabled}
//                   onCheckedChange={(value) => handleSettingsChange("smsEnabled", value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Tiempo de antelación */}
//           <div className="timeframe">
//             <Label>Tiempo de antelación por defecto</Label>
//             <Select
//               value={settings.defaultTimeframe}
//               onValueChange={(value) => handleSettingsChange("defaultTimeframe", value)}
//             >
//               <SelectTrigger className="select-gold">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="24h">24 horas antes</SelectItem>
//                 <SelectItem value="12h">12 horas antes</SelectItem>
//                 <SelectItem value="6h">6 horas antes</SelectItem>
//                 <SelectItem value="2h">2 horas antes</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Separator />

//           <div className="save-settings">
//             <Button className="btn-gold">
//               <CheckCircle className="icon-sm" />
//               Guardar Configuración
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Estadísticas */}
//       <div className="stats-grid">
//         <div className="stat-card yellow">
//           <Clock className="icon-white" />
//           <h3>Pendientes</h3>
//           <p>{pendingReminders.length}</p>
//         </div>

//         <div className="stat-card green">
//           <CheckCircle className="icon-white" />
//           <h3>Enviados Hoy</h3>
//           <p>{sentReminders.length}</p>
//         </div>

//         <div className="stat-card red">
//           <AlertCircle className="icon-white" />
//           <h3>Fallidos</h3>
//           <p>{failedReminders.length}</p>
//         </div>
//       </div>

//       {/* Lista de recordatorios */}
//       <Card className="card-queue">
//         <CardHeader>
//           <CardTitle className="title-header">
//             <Bell className="icon-gold" />
//             Cola de Recordatorios
//           </CardTitle>
//           <CardDescription>
//             Gestiona los recordatorios programados y su estado
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {reminders.map((reminder) => (
//             <div key={reminder.id} className="reminder-item">
//               <div className="reminder-info">
//                 <div className="reminder-icon">
//                   {reminder.channel === "email" ? (
//                     <Mail className="icon-white" />
//                   ) : (
//                     <MessageSquare className="icon-white" />
//                   )}
//                 </div>
//                 <div>
//                   <h4>{reminder.clientName}</h4>
//                   <p>
//                     {reminder.service} - {reminder.date} a las {reminder.time}
//                   </p>
//                   <small>Programado para: {formatDateTime(reminder.scheduledFor)}</small>
//                 </div>
//               </div>

//               <div className="reminder-actions">
//                 <Badge className={getStatusColor(reminder.status)}>
//                   {getStatusIcon(reminder.status)}
//                   <span>{getStatusText(reminder.status)}</span>
//                 </Badge>

//                 {reminder.status === "pending" && (
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button variant="outline" size="sm" className="btn-outline-gold">
//                         <Send className="icon-sm" />
//                         Enviar Ahora
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Enviar Recordatorio</DialogTitle>
//                         <DialogDescription>
//                           ¿Deseas enviar este recordatorio ahora a {reminder.clientName}?
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="dialog-actions">
//                         <Button variant="outline">Cancelar</Button>
//                         <Button className="btn-gold">
//                           <Send className="icon-sm" />
//                           Enviar
//                         </Button>
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 )}

//                 {reminder.status === "failed" && (
//                   <Button variant="outline" size="sm" className="btn-outline-red">
//                     <RefreshCw className="icon-sm" />
//                     Reintentar
//                   </Button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React from "react";

export function ReminderSettings() {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Configuración de Recordatorios</h2>
      <p>Aquí podrás configurar alertas automáticas para las citas.</p>
    </div>
  );
}
