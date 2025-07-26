// Main types export file - JC Pastelaria Gourmet
// This file re-exports all types from different modules for easy importing

// Database types (Supabase generated + enhanced)
export * from './supabase'
export * from './database'

// Component types (selective export to avoid conflicts)
export type {
  BaseComponentProps,
  ButtonProps,
  InputProps,
  ModalProps,
  CardProps,
  BadgeProps,
  LoadingProps,
  ToastProps,
  HeaderProps,
  FooterProps,
  SidebarProps,
  ProductCardProps,
  ProductGridProps,
  ProductModalProps,
  ProductCustomizerProps,
  ProductFiltersProps as ComponentProductFilters,
  CartDrawerProps,
  CartItemProps,
  CartSummaryProps,
  CartItem,
  PointsDisplayProps,
  LevelProgressProps,
  AchievementCardProps,
  ChallengeCardProps,
  LeaderboardProps,
  UserDashboardProps,
  StatsCardProps,
  QuickActionsProps,
  OrderCardProps,
  OrderTrackingProps,
  OrderHistoryProps,
  ReviewCardProps,
  ReviewFormProps,
  ReviewsListProps,
  AddressCardProps,
  AddressFormProps,
  NotificationItemProps,
  NotificationCenterProps
} from './components'

// Form and validation types (selective export)
export type {
  FormField,
  FormState,
  FormValidation,
  ValidationRule,
  ValidationResult as FormValidationResult,
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ChangePasswordFormData,
  ProfileFormData,
  UserPreferencesFormData,
  NotificationPreferencesFormData,
  DietaryPreferencesFormData,
  DeliveryPreferencesFormData,
  AddressFormData as FormAddressData,
  AddressValidationData,
  ProductCustomizationFormData,
  CustomizationSelectionFormData,
  AddToCartFormData,
  CheckoutFormData,
  PaymentMethodFormData,
  CardFormData,
  ScheduledDeliveryFormData,
  ReviewFormData as FormReviewData,
  ReviewResponseFormData,
  ContactFormData,
  SupportTicketFormData,
  ProductSearchFormData,
  OrderSearchFormData,
  NewsletterFormData,
  FeedbackFormData,
  FormValidationSchema,
  ValidationPatterns,
  FieldConfig,
  FormConfig,
  UseFormReturn,
  UseFormValidationReturn,
  FormContextValue,
  MultiStepFormStep,
  MultiStepFormStepProps,
  MultiStepFormState,
  DynamicFormField,
  DynamicFormConfig
} from './forms'

// Store types (selective export)
export type {
  BaseStore,
  AuthState,
  AuthActions,
  AuthStore,
  SignUpData,
  CartState,
  CartActions,
  CartStore,
  ProductsState,
  ProductsActions,
  ProductsStore,
  OrdersState,
  OrdersActions,
  OrdersStore,
  GamificationState,
  GamificationActions,
  GamificationStore,
  NotificationsState,
  NotificationsActions,
  NotificationsStore,
  AddressesState,
  AddressesActions,
  AddressesStore,
  UIState,
  UIActions,
  UIStore,
  AppStore
} from './store'

// API and external service types (selective export)
export type {
  ApiResponse as ApiResponseType,
  ApiError,
  PaginatedResponse as ApiPaginatedResponse,
  ApiRequestConfig,
  AuthApiEndpoints,
  SignInRequest,
  SignUpRequest,
  AuthResponse,
  TokenResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UserApiEndpoints,
  UpdateProfileRequest,
  ProductsApiEndpoints,
  ProductsQueryParams,
  OrdersApiEndpoints,
  OrdersQueryParams,
  CreateOrderRequest,
  OrderItemRequest,
  CustomizationSelection,
  AddressesApiEndpoints,
  CreateAddressRequest,
  UpdateAddressRequest,
  AddressValidation as ApiAddressValidation,
  DeliveryFeeCalculation,
  GamificationApiEndpoints,
  GamificationStats,
  ReviewsApiEndpoints,
  CreateReviewRequest,
  UpdateReviewRequest,
  NotificationsApiEndpoints,
  NotificationsQueryParams,
  StripeApiEndpoints,
  CreatePaymentIntentRequest,
  StripePaymentIntent,
  CreateStripeCustomerRequest,
  StripeCustomer,
  StripePaymentMethod,
  StripeRefund,
  PixApiEndpoints,
  GeneratePixRequest,
  PixPaymentResponse,
  PixPaymentStatus,
  EmailApiEndpoints,
  SendEmailRequest,
  SendBulkEmailRequest,
  EmailRecipient,
  EmailAttachment,
  EmailResponse,
  EmailTemplate,
  EmailDeliveryStatus,
  WhatsAppApiEndpoints,
  SendWhatsAppMessageRequest,
  SendWhatsAppTemplateRequest,
  WhatsAppMessageResponse,
  WhatsAppMessageStatus,
  CepApiEndpoints,
  CepValidationResponse,
  DeliveryFeeResponse,
  AnalyticsApiEndpoints,
  PurchaseEvent,
  PurchaseItem,
  UserAnalytics
} from './api'

// Utility types and helpers (selective export)
export type {
  Optional,
  Nullable,
  Maybe,
  DeepPartial,
  DeepRequired,
  NonEmptyArray,
  ArrayElement,
  KeysOfType,
  ValuesOf,
  Entries,
  FromEntries,
  AsyncFunction,
  SyncFunction,
  AnyFunction,
  EventHandler,
  ChangeHandler,
  ClickHandler,
  SubmitHandler,
  PropsWithChildren,
  PropsWithClassName,
  PropsWithTestId,
  BaseProps,
  FieldValue,
  FieldError,
  FieldTouched,
  FieldState,
  ApiMethod,
  ApiStatus,
  ApiState,
  DateString,
  TimeString,
  DateTimeString,
  Timestamp,
  UUID,
  ID,
  LoadingState,
  AsyncState,
  ThemeMode,
  ColorScheme,
  Size,
  Variant,
  Breakpoint,
  Direction,
  Alignment,
  Justification,
  AnimationDuration,
  AnimationType,
  AnimationDirection,
  ValidationResult as UtilValidationResult,
  Validator,
  ValidatorRule,
  SortOrder,
  SortConfig,
  FilterOperator,
  FilterCondition,
  FilterConfig,
  PaginationConfig,
  SearchConfig,
  Permission,
  Role,
  PermissionCheck,
  RoleCheck,
  ErrorCode,
  ErrorMessage,
  ErrorDetails,
  AppError,
  FileType,
  MimeType,
  FileSize,
  FileInfo,
  Coordinates,
  Location,
  Currency,
  Money,
  Locale,
  Translation,
  Translations,
  DeviceType,
  Platform,
  Browser,
  ConnectionType,
  NetworkStatus,
  StorageType,
  StorageKey,
  StorageValue,
  EventName,
  EventProperties,
  FeatureFlag,
  FeatureFlagValue,
  FeatureFlags,
  ExperimentId,
  VariantId,
  ExperimentVariant,
  Experiment,
  NotificationPermission,
  NotificationAction,
  NotificationOptions,
  WebSocketState,
  WebSocketMessage,
  CacheKey,
  CacheValue,
  CacheStrategy,
  QueueItem,
  QueueProcessor,
  StateValue,
  StateContext,
  StateEvent,
  StateTransition,
  WorkflowStep,
  Workflow,
  ConfigValue,
  Config,
  Environment,
  LogLevel,
  LogEntry,
  MetricName,
  MetricValue,
  MetricTags,
  Metric,
  HealthStatus,
  HealthCheck,
  RateLimit,
  BackupStatus,
  Backup,
  MigrationStatus,
  Migration
} from './utils'

// Utility functions
export {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
  isNull,
  isUndefined,
  isNullish,
  isDefined,
  isEmpty,
  assertString,
  assertNumber,
  assertBoolean,
  assertObject,
  assertArray,
  assertFunction,
  assertDefined
} from './utils'

// Re-export modules for validation script compatibility
export * as components from './components'
export * as forms from './forms'
export * as store from './store'
export * as api from './api'
export * as utils from './utils'

// Legacy types (for backward compatibility)
// These will be gradually replaced by the new modular types above

export interface UserPreferences {
  favorite_flavors: string[];
  dietary_restrictions: string[];
  notification_settings: NotificationSettings;
  theme: 'light' | 'dark' | 'auto';
}

export interface NotificationSettings {
  email_promotions: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  order_updates: boolean;
}

export interface SelectedCustomization {
  customization_id: string;
  option_ids: string[];
}

export interface AchievementRequirement {
  orders_count?: number;
  total_spent?: number;
  unique_products?: number;
  consecutive_days?: number;
  time_range?: {
    start: string;
    end: string;
  };
}

export interface ChallengeRequirement {
  orders_count?: number;
  total_spent?: number;
  specific_products?: string[];
  days_active?: number;
}

// API Response Types (legacy)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types (legacy)
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface CheckoutForm {
  delivery_type: 'delivery' | 'pickup';
  address_id?: string;
  payment_method: string;
  notes?: string;
  coupon_code?: string;
}