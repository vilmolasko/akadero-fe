'use client';
import { useState, useEffect, forwardRef } from 'react';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import { CircleFlag } from 'react-circle-flags';
import { lookup } from 'country-data-list';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { GlobeIcon } from 'lucide-react';

export const phoneSchema = z.string().refine((value) => {
  try {
    return isValidPhoneNumber(value);
  } catch {
    return false;
  }
}, 'Invalid phone number');

export const PhoneInput = forwardRef(
  (
    {
      className,
      onCountryChange,
      onChange,
      value,
      placeholder,
      defaultCountry = 'us',
      inline = false,
      ...props
    },
    ref
  ) => {
    const [allCountries, setAllCountries] = useState([]);
    const [countryData, setCountryData] = useState();
    const [displayFlag, setDisplayFlag] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [hasInitialized, setHasInitialized] = useState(false);

    // 🔹 Load all countries and their codes
    useEffect(() => {
      try {
        const list = lookup.countries().map((c) => ({
          name: c.name,
          alpha2: c.alpha2.toLowerCase(),
          code: c.countryCallingCodes?.[0] || '',
        }));
        const uniqueList = list
          .filter((c) => c.code)
          .sort((a, b) => a.name.localeCompare(b.name));
        setAllCountries(uniqueList);
      } catch (err) {
        console.error('Error loading country list:', err);
      }
    }, []);

    // 🔹 Set default country when available
    useEffect(() => {
      if (defaultCountry && allCountries.length > 0 && !hasInitialized) {
        const found = allCountries.find(
          (c) => c.alpha2 === defaultCountry.toLowerCase()
        );
        if (found) {
          setCountryData(found);
          setDisplayFlag(found.alpha2);
          setSelectedCode(found.code);
          onChange?.(found.code);
          setHasInitialized(true);
        }
      }
    }, [defaultCountry, allCountries, hasInitialized, onChange]);

    const handlePhoneChange = (e) => {
      let newValue = e.target.value;

      // Ensure "+" prefix
      if (!newValue.startsWith('+')) {
        if (newValue.startsWith('00')) {
          newValue = '+' + newValue.slice(2);
        } else if (selectedCode) {
          newValue = `${selectedCode}${newValue}`;
        } else {
          newValue = '+' + newValue;
        }
      }

      try {
        const parsed = parsePhoneNumber(newValue);
        if (parsed && parsed.country) {
          const countryCode = parsed.country.toLowerCase();
          setDisplayFlag(countryCode);
          const found = allCountries.find((c) => c.alpha2 === countryCode);
          if (found) {
            setCountryData(found);
            setSelectedCode(found.code);
            onCountryChange?.(found);
          }
          onChange?.(parsed.number);
        } else {
          onChange?.(newValue);
          setDisplayFlag('');
          setCountryData(undefined);
        }
      } catch {
        onChange?.(newValue);
        setDisplayFlag('');
        setCountryData(undefined);
      }
    };

    const handleCodeChange = (e) => {
      const code = e.target.value;
      const found = allCountries.find((c) => c.code === code);
      setSelectedCode(code);
      if (found) {
        setCountryData(found);
        setDisplayFlag(found.alpha2);
        onCountryChange?.(found);
      }

      if (value && !value.startsWith(code)) {
        const numberPart = value.replace(/^\+\d+/, '');
        onChange?.(`${code}${numberPart}`);
      } else {
        onChange?.(code);
      }
    };

    const inputClasses = cn(
      'flex items-center gap-2 relative bg-transparent transition-colors text-base rounded-md border border-input pl-3 h-9 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed md:text-sm has-[input:focus]:outline-none has-[input:focus]:ring-1 has-[input:focus]:ring-ring [interpolate-size:allow-keywords]',
      inline && 'rounded-l-none w-full',
      className
    );

    return (
      <div className={inputClasses}>
        {!inline && (
          <div className='flex items-center gap-1'>
            <div className='w-4 h-4 rounded-full shrink-0'>
              {displayFlag ? (
                <CircleFlag
                  countryCode={displayFlag}
                  height={16}
                />
              ) : (
                <GlobeIcon size={16} />
              )}
            </div>

            {/* 🔹 Full Country Dropdown */}
            <select
              value={selectedCode}
              onChange={handleCodeChange}
              className='bg-transparent text-sm outline-none cursor-pointer max-w-[90px]'>
              {allCountries.map((country) => (
                <option
                  key={country.alpha2}
                  value={country.code}>
                  {country.code} {country.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <input
          ref={ref}
          value={value}
          onChange={handlePhoneChange}
          placeholder={placeholder || 'Enter number'}
          type='tel'
          autoComplete='tel'
          name='phone'
          className={cn(
            'flex w-full border-none bg-transparent text-base transition-colors placeholder:text-muted-foreground outline-none h-9 py-1 p-0 leading-none md:text-sm [interpolate-size:allow-keywords]',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
