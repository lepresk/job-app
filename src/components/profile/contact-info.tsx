import { 
  MailIcon, 
  PhoneIcon, 
  MessageSquareIcon, 
  MapPinIcon,
  CalendarIcon,
  UserIcon
} from 'lucide-react';

interface ContactInfoProps {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  dateOfBirth: string;
  gender: string;
}

export function ContactInfo({
  email,
  phone,
  whatsapp,
  address,
  dateOfBirth,
  gender,
}: ContactInfoProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex items-center space-x-3">
        <MailIcon className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <PhoneIcon className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{phone}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <MessageSquareIcon className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm text-gray-500">WhatsApp</p>
          <p className="font-medium">{whatsapp}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <MapPinIcon className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">{address}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <CalendarIcon className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm text-gray-500">Date of Birth</p>
          <p className="font-medium">{dateOfBirth}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <UserIcon className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm text-gray-500">Gender</p>
          <p className="font-medium">{gender}</p>
        </div>
      </div>
    </div>
  );
}