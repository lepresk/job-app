import { useEffect, useState } from 'react';
import { Country, City, ICountry, ICity } from 'country-state-city';
import { Label } from '@/components/ui/label';

interface CountryCitySelectProps {
  selectedCountry: string;
  selectedCity: string;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
  error?: {
    country?: string;
    city?: string;
  };
}

export function CountryCitySelect({
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
  error,
}: CountryCitySelectProps) {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const country = Country.getAllCountries().find(
        (c) => c.name === selectedCountry
      );
      if (country) {
        setCities(City.getCitiesOfCountry(country.isoCode) || []);
      }
    }
  }, [selectedCountry]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Country</Label>
        <select
          className="w-full rounded-md border border-gray-200 p-2"
          value={selectedCountry}
          onChange={(e) => {
            onCountryChange(e.target.value);
            onCityChange('');
          }}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {error?.country && (
          <p className="text-sm text-red-500">{error.country}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>City</Label>
        <select
          className="w-full rounded-md border border-gray-200 p-2"
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {error?.city && (
          <p className="text-sm text-red-500">{error.city}</p>
        )}
      </div>
    </div>
  );
}