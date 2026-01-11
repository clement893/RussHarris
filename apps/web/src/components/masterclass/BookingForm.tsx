/**
 * BookingForm Component
 * Form for booking with validation using Zod
 */

'use client';

import { z } from 'zod';
import { useForm } from '@/hooks/forms/useForm';
import { Mail, Phone, User, Users, BookOpen } from 'lucide-react';

const experienceLevels = [
  { value: 'DÉBUTANT', label: 'Débutant' },
  { value: 'INTERMÉDIAIRE', label: 'Intermédiaire' },
  { value: 'AVANCÉ', label: 'Avancé' },
];

const actExperienceOptions = [
  { value: 'AUCUNE', label: 'Aucune' },
  { value: '1-2 ans', label: '1-2 ans' },
  { value: '3-5 ans', label: '3-5 ans' },
  { value: '6-10 ans', label: '6-10 ans' },
  { value: '10+ ans', label: '10+ ans' },
];

const bookingSchema = z.object({
  attendee_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  attendee_email: z.string().email('Email invalide'),
  attendee_phone: z.string().optional(),
  quantity: z.number().min(1, 'Au moins 1 billet requis').max(10, 'Maximum 10 billets'),
  ticket_type: z.enum(['EARLY_BIRD', 'REGULAR', 'GROUP']),
  experience_level: z.string().optional(),
  act_experience: z.string().optional(),
  dietary_restrictions: z.string().optional(),
  // For group bookings, collect info for additional attendees
  additional_attendees: z.array(z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
  })).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  cityEventId: number;
  onSubmit: (data: BookingFormData) => Promise<void>;
  isLoading?: boolean;
  initialValues?: Partial<BookingFormData>;
}

export default function BookingForm({
  cityEventId: _cityEventId,
  onSubmit,
  isLoading = false,
  initialValues = {},
}: BookingFormProps) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
  } = useForm<BookingFormData>({
    initialValues: {
      quantity: 1,
      ticket_type: 'REGULAR',
      ...initialValues,
    },
    validationSchema: bookingSchema,
    onSubmit: async (data) => {
      await onSubmit(data);
    },
    validateOnBlur: true,
  });

  const handleQuantityChange = (newQuantity: number) => {
    setValue('quantity', newQuantity);
    if (newQuantity >= 3) {
      setValue('ticket_type', 'GROUP');
    } else {
      setValue('ticket_type', 'REGULAR');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Primary Attendee Information */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-black flex items-center gap-2">
          <User className="w-6 h-6" aria-hidden="true" />
          Informations du participant principal
        </h3>

        <div>
          <label htmlFor="attendee_name" className="block text-sm font-bold text-black mb-2">
            Nom complet *
          </label>
          <input
            id="attendee_name"
            type="text"
            value={values.attendee_name || ''}
            onChange={handleChange('attendee_name')}
            onBlur={handleBlur('attendee_name')}
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
            placeholder="Jean Dupont"
          />
          {touched.attendee_name && errors.attendee_name && (
            <p className="mt-1 text-sm text-red-600">{errors.attendee_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="attendee_email" className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" aria-hidden="true" />
            Email *
          </label>
          <input
            id="attendee_email"
            type="email"
            value={values.attendee_email || ''}
            onChange={handleChange('attendee_email')}
            onBlur={handleBlur('attendee_email')}
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
            placeholder="jean.dupont@example.com"
          />
          {touched.attendee_email && errors.attendee_email && (
            <p className="mt-1 text-sm text-red-600">{errors.attendee_email}</p>
          )}
        </div>

        <div>
          <label htmlFor="attendee_phone" className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" aria-hidden="true" />
            Téléphone
          </label>
          <input
            id="attendee_phone"
            type="tel"
            value={values.attendee_phone || ''}
            onChange={handleChange('attendee_phone')}
            onBlur={handleBlur('attendee_phone')}
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      {/* Quantity and Ticket Type */}
      <div className="space-y-6 border-t border-gray-200 pt-6">
        <h3 className="text-2xl font-black text-black flex items-center gap-2">
          <Users className="w-6 h-6" aria-hidden="true" />
          Nombre de billets
        </h3>

        <div>
          <label htmlFor="quantity" className="block text-sm font-bold text-black mb-2">
            Nombre de participants (1-10) *
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            max="10"
            value={values.quantity || 1}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
          />
          {touched.quantity && errors.quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
          )}
          {values.quantity && values.quantity >= 3 && (
            <p className="mt-2 text-sm text-green-600">
              ✓ Tarif groupe appliqué pour 3+ participants
            </p>
          )}
        </div>
      </div>

      {/* Experience Information */}
      <div className="space-y-6 border-t border-gray-200 pt-6">
        <h3 className="text-2xl font-black text-black flex items-center gap-2">
          <BookOpen className="w-6 h-6" aria-hidden="true" />
          Expérience ACT (optionnel)
        </h3>

        <div>
          <label htmlFor="experience_level" className="block text-sm font-bold text-black mb-2">
            Niveau d'expérience
          </label>
          <select
            id="experience_level"
            value={values.experience_level || ''}
            onChange={handleChange('experience_level')}
            onBlur={handleBlur('experience_level')}
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
          >
            <option value="">Sélectionner...</option>
            {experienceLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="act_experience" className="block text-sm font-bold text-black mb-2">
            Expérience avec l'ACT
          </label>
          <select
            id="act_experience"
            value={values.act_experience || ''}
            onChange={handleChange('act_experience')}
            onBlur={handleBlur('act_experience')}
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
          >
            <option value="">Sélectionner...</option>
            {actExperienceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dietary_restrictions" className="block text-sm font-bold text-black mb-2">
            Restrictions alimentaires
          </label>
          <textarea
            id="dietary_restrictions"
            value={values.dietary_restrictions || ''}
            onChange={handleChange('dietary_restrictions')}
            onBlur={handleBlur('dietary_restrictions')}
            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
            rows={3}
            placeholder="Végétarien, allergies, etc."
          />
        </div>
      </div>

      {/* Error Display */}
      {errors._form && (
        <div className="p-4 bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errors._form}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full px-12 py-4 bg-black text-white font-bold text-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting || isLoading ? 'Traitement...' : 'Continuer vers le paiement'}
        </button>
      </div>
    </form>
  );
}
