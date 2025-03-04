/**
 * Esta interfaz define la forma de un objeto de Booking:

- **bookingid**: un identificador único para la reserva (number)
- **roomid**: el ID de la habitación reservada (number)
- **firstname** y **lastname**: el nombre del huésped (string)
- **depositpaid**: un booleano que indica si se ha pagado un depósito
- **bookingdates**: un objeto con las propiedades checkin y checkout (String) que representan las fechas de la reserva
*/
export interface Booking {
    bookingid: number;
    roomid: number;
    firstname: string;
    lastname: string;
    depositpaid: boolean;
    bookingdates: {
      checkin: string;
      checkout: string;
    };
}
