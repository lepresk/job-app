import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { XIcon } from 'lucide-react';
import { getCommonBenefits } from '@/lib/firebase/jobs';

interface BenefitSelectProps {
  value: string[];
  onChange: (benefits: string[]) => void;
  error?: string;
}

export function BenefitSelect({ value, onChange, error }: BenefitSelectProps) {
  const [commonBenefits, setCommonBenefits] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const data = await getCommonBenefits();
        setCommonBenefits(data);
      } catch (error) {
        console.error('Error loading benefits:', error);
      }
    };

    fetchBenefits();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    if (input.trim()) {
      const filtered = commonBenefits
        .map(b => b.name)
        .filter(b => 
          b.toLowerCase().includes(input.toLowerCase()) &&
          !value.includes(b)
        );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue('');
      setSuggestions([]);
    }
  };

  const addBenefit = (benefit: string) => {
    if (!value.includes(benefit)) {
      onChange([...value, benefit]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const removeBenefit = (benefit: string) => {
    onChange(value.filter(b => b !== benefit));
  };

  return (
    <div className="space-y-4">
      <Label>Benefits</Label>
      
      <div className="relative">
        <Input
          placeholder="Type a benefit and press Enter"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => addBenefit(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((benefit) => (
          <span
            key={benefit}
            className="flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
          >
            <span>{benefit}</span>
            <button
              type="button"
              onClick={() => removeBenefit(benefit)}
              className="ml-2 rounded-full p-1 hover:bg-blue-200"
            >
              <XIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}