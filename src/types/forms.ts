// Form and validation types
import * as React from 'react'
import { User, Address, Product, Order, Review } from './database'

// Base form types
export interface FormField<T = any> {
  value: T
  error?: string
  touched?: boolean
  required?: boolean
  disabled?: boolean
}

export interface FormState<T extends Record<string, any>> {
  fields: {
    [K in keyof T]: FormField<T[K]>
  }
  isValid: boolean
  isSubmitting: boolean
  isDirty: boolean
  errors: Partial<Record<keyof T, string>>
}

export interface FormValidation<T> {
  field: keyof T
  rules: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  value?: any
  message: string
  validator?: (value: any, formData?: any) => boolean
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

// Authentication forms
export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  acceptTerms: boolean
  acceptMarketing?: boolean
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
  token: string
}

export interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// User profile forms
export interface ProfileFormData {
  name: string
  email: string
  phone?: string
  avatar?: File
  preferences: UserPreferencesFormData
}

export interface UserPreferencesFormData {
  theme: 'light' | 'dark' | 'auto'
  language: 'pt-BR' | 'en-US'
  notifications: NotificationPreferencesFormData
  dietary: DietaryPreferencesFormData
  delivery: DeliveryPreferencesFormData
}

export interface NotificationPreferencesFormData {
  email: boolean
  sms: boolean
  push: boolean
  orderUpdates: boolean
  promotions: boolean
  achievements: boolean
  challenges: boolean
  reminders: boolean
}

export interface DietaryPreferencesFormData {
  restrictions: string[]
  allergies: string[]
  preferences: string[]
  spiceLevel: 'mild' | 'medium' | 'hot' | 'extra_hot'
}

export interface DeliveryPreferencesFormData {
  defaultAddressId?: string
  preferredDeliveryTime?: string
  specialInstructions?: string
  contactPreference: 'phone' | 'sms' | 'app'
}

// Address forms
export interface AddressFormData {
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isDefault?: boolean
}

export interface AddressValidationData {
  zipCode: string
  street?: string
  neighborhood?: string
  city?: string
  state?: string
  isValid: boolean
  deliveryAvailable: boolean
  estimatedFee?: number
}

// Product and cart forms
export interface ProductCustomizationFormData {
  sizeId?: string
  customizations: CustomizationSelectionFormData[]
  quantity: number
  notes?: string
}

export interface CustomizationSelectionFormData {
  customizationId: string
  optionIds: string[]
}

export interface AddToCartFormData extends ProductCustomizationFormData {
  productId: string
}

// Checkout forms
export interface CheckoutFormData {
  deliveryType: 'delivery' | 'pickup'
  addressId?: string
  newAddress?: AddressFormData
  paymentMethod: PaymentMethodFormData
  couponCode?: string
  notes?: string
  scheduledDelivery?: ScheduledDeliveryFormData
}

export interface PaymentMethodFormData {
  type: 'pix' | 'credit_card' | 'debit_card' | 'cash' | 'points'
  cardData?: CardFormData
  pointsAmount?: number
  installments?: number
}

export interface CardFormData {
  number: string
  holderName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  saveCard?: boolean
}

export interface ScheduledDeliveryFormData {
  date: string
  timeSlot: string
  instructions?: string
}

// Review forms
export interface ReviewFormData {
  productId: string
  orderId: string
  rating: number
  comment?: string
  images?: File[]
  wouldRecommend?: boolean
}

export interface ReviewResponseFormData {
  reviewId: string
  response: string
}

// Contact and support forms
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  category: 'support' | 'complaint' | 'suggestion' | 'compliment' | 'other'
  orderId?: string
}

export interface SupportTicketFormData {
  subject: string
  description: string
  category: 'order_issue' | 'payment_issue' | 'delivery_issue' | 'product_issue' | 'account_issue' | 'other'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  orderId?: string
  attachments?: File[]
}

// Search and filter forms
export interface ProductSearchFormData {
  query?: string
  categoryId?: string
  priceMin?: number
  priceMax?: number
  rating?: number
  preparationTimeMax?: number
  dietary?: string[]
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'newest'
  sortOrder?: 'asc' | 'desc'
}

export interface OrderSearchFormData {
  query?: string
  status?: Order['status'][]
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
  paymentMethod?: string
  deliveryType?: Order['delivery_type']
}

// Newsletter and marketing forms
export interface NewsletterFormData {
  email: string
  name?: string
  preferences?: string[]
}

export interface FeedbackFormData {
  rating: number
  comment?: string
  category: 'app' | 'service' | 'product' | 'delivery' | 'overall'
  wouldRecommend: boolean
  suggestions?: string
}

// Form validation schemas (to be used with validation libraries)
export type FormValidationSchema<T> = {
  [K in keyof T]?: ValidationRule[]
}

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  zipCode: /^\d{5}-?\d{3}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  creditCard: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
  cvv: /^\d{3,4}$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
} as const

// Form field configurations
export interface FieldConfig {
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'time'
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  options?: { value: string; label: string }[]
  validation?: ValidationRule[]
  dependencies?: string[]
  conditional?: (formData: any) => boolean
}

export interface FormConfig<T> {
  fields: {
    [K in keyof T]: FieldConfig
  }
  submitText?: string
  resetText?: string
  cancelText?: string
  onSubmit: (data: T) => Promise<void> | void
  onReset?: () => void
  onCancel?: () => void
}

// Form hooks return types
export interface UseFormReturn<T> {
  formData: T
  errors: Partial<Record<keyof T, string>>
  isValid: boolean
  isSubmitting: boolean
  isDirty: boolean
  setValue: <K extends keyof T>(field: K, value: T[K]) => void
  setError: (field: keyof T, error: string) => void
  clearError: (field: keyof T) => void
  clearErrors: () => void
  validate: (field?: keyof T) => boolean
  submit: () => Promise<void>
  reset: () => void
}

export interface UseFormValidationReturn {
  validate: (data: any, schema: FormValidationSchema<any>) => ValidationResult
  validateField: (value: any, rules: ValidationRule[]) => string | undefined
}

// Form context types
export interface FormContextValue<T> {
  formData: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  setValue: <K extends keyof T>(field: K, value: T[K]) => void
  setError: (field: keyof T, error: string) => void
  clearError: (field: keyof T) => void
}

// Multi-step form types
export interface MultiStepFormStep<T = any> {
  id: string
  title: string
  description?: string
  component: React.ComponentType<MultiStepFormStepProps<T>>
  validation?: FormValidationSchema<T>
  optional?: boolean
}

export interface MultiStepFormStepProps<T> {
  data: T
  errors: Partial<Record<keyof T, string>>
  onChange: <K extends keyof T>(field: K, value: T[K]) => void
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export interface MultiStepFormState<T> {
  currentStep: number
  data: T
  errors: Partial<Record<keyof T, string>>
  completedSteps: number[]
  isValid: boolean
  isSubmitting: boolean
}

// Dynamic form types
export interface DynamicFormField {
  id: string
  type: FieldConfig['type']
  label: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: ValidationRule[]
  defaultValue?: any
  dependencies?: string[]
  conditional?: (formData: any) => boolean
}

export interface DynamicFormConfig {
  id: string
  title: string
  description?: string
  fields: DynamicFormField[]
  submitText?: string
  onSubmit: (data: Record<string, any>) => Promise<void> | void
}