import {
  IAppointmentPeriodDay,
  IAppointmentPrisma,
  IAppointmentPeriod,
  IAppointment,
} from '@/types/appointments';

export const mockAppointments = Array.from({ length: 1 }, (_, index) => ({
  id: String(Math.random()),
  petName: `Pet ${index + 1}`,
  tutorName: `Tutor ${index + 1}`,
  phone: `999999999${index + 1}`,
  scheduleAt: new Date(),
}));

export const getPeriod = (hour: number): IAppointmentPeriodDay => {
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 13 && hour < 18) return 'afternoon';
  return 'evening';
};

export function groupAppointmentsByPeriod(
  appointments: IAppointmentPrisma[]
): IAppointmentPeriod[] {
  const transformedAppointments: IAppointment[] = appointments.map(
    (item: any) => ({
      ...item,
      time: item.scheduleAt.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      service: item.description,
      period: getPeriod(item.scheduleAt.getHours()),
    })
  );

  const morningAppointments = transformedAppointments.filter(
    (item) => item.period === 'morning'
  );

  const afternoonAppointments = transformedAppointments.filter(
    (item) => item.period === 'afternoon'
  );

  const eveningAppointments = transformedAppointments.filter(
    (item) => item.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09:00 - 12:00',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13:00 - 18:00',
      appointments: afternoonAppointments,
    },
    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19:00 - 21:00',
      appointments: eveningAppointments,
    },
  ];
}
