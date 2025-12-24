import { PeriodSection } from '@/components/PeriodSection';

import {
  groupAppointmentsByPeriod,
  mockAppointments,
} from '@/utils/appointments-utils';

export default function Home() {
  const periods = groupAppointmentsByPeriod(mockAppointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-paragraph-medium text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para você
          </p>
        </div>
      </div>
      {periods.map((period, index) => (
        <PeriodSection period={period} key={index} />
      ))}
    </div>
  );
}
