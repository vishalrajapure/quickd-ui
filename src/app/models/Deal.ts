import { Sender } from './Sender';
import { Carrier } from './Carrier';
import { Receiver } from './Receiver';
import { Parcel } from './Parcel';
import { Address } from './Address';


export class Deal {
  dealId!: number;
  sender!: Sender;
  carrier!: Carrier;
  receiver!: Receiver;
  parcel!: Parcel;
  pickUpLocation!:Address;
  dropLocation!:Address;
  dealTotal!:number;
  createdDate!: Date;
  updatedDate!:Date;
};
