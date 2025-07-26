// Utility types and type helpers
import { ReactNode } from 'react'

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type Nullable<T> = T | null
export type Maybe<T> = T | null | undefined
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

// Array utility types
export type NonEmptyArray<T> = [T, ...T[]]
export type ArrayElement<T> = T extends (infer U)[] ? U : never
export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [...R, T]>

// Object utility types
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]
export type ValuesOf<T> = T[keyof T]
export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
export type FromEntries<T extends readonly [PropertyKey, any][]> = {
  [K in T[number] as K[0]]: K[1]
}

// Function utility types
export type AsyncFunction<T extends any[] = any[], R = any> = (...args: T) => Promise<R>
export type SyncFunction<T extends any[] = any[], R = any> = (...args: T) => R
export type AnyFunction<T extends any[] = any[], R = any> = SyncFunction<T, R> | AsyncFunction<T, R>
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

// Event handler types
export type EventHandler<T = Event> = (event: T) => void
export type ChangeHandler<T = any> = (value: T) => void
export type ClickHandler = EventHandler<MouseEvent>
export type SubmitHandler<T = any> = (data: T) => void | Promise<void>

// Component prop types
export type PropsWithChildren<P = {}> = P & { children?: ReactNode }
export type PropsWithClassName<P = {}> = P & { className?: string }
export type PropsWithTestId<P = {}> = P & { testId?: string }
export type BaseProps = PropsWithChildren<PropsWithClassName<PropsWithTestId>>

// Form field types
export type FieldValue = string | number | boolean | Date | File | null | undefined
export type FieldError = string | null
export type FieldTouched = boolean
export type FieldState<T = FieldValue> = {
  value: T
  error: FieldError
  touched: FieldTouched
}

// API types
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'
export type ApiState<T = any> = {
  data: T | null
  status: ApiStatus
  error: string | null
}

// Date and time types
export type DateString = string // ISO date string
export type TimeString = string // HH:MM format
export type DateTimeString = string // ISO datetime string
export type Timestamp = number // Unix timestamp

// ID types
export type UUID = string
export type ID = string | number
export type EntityId<T extends string> = `${T}_${string}`

// Status types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'
export type AsyncState<T, E = string> = {
  data: T | null
  loading: boolean
  error: E | null
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'auto'
export type ColorScheme = 'light' | 'dark'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

// Layout types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type Direction = 'horizontal' | 'vertical'
export type Alignment = 'start' | 'center' | 'end' | 'stretch'
export type Justification = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

// Animation types
export type AnimationDuration = 'fast' | 'normal' | 'slow'
export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce' | 'spin'
export type AnimationDirection = 'up' | 'down' | 'left' | 'right'

// Validation types
export type ValidationResult = {
  isValid: boolean
  errors: string[]
}
export type Validator<T = any> = (value: T) => ValidationResult | Promise<ValidationResult>
export type ValidatorRule<T = any> = {
  validator: Validator<T>
  message: string
}

// Filter and sort types
export type SortOrder = 'asc' | 'desc'
export type SortConfig<T> = {
  field: keyof T
  order: SortOrder
}
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'startsWith' | 'endsWith'
export type FilterCondition<T> = {
  field: keyof T
  operator: FilterOperator
  value: any
}
export type FilterConfig<T> = FilterCondition<T>[]

// Pagination types
export type PaginationConfig = {
  page: number
  limit: number
  total?: number
  totalPages?: number
  hasNext?: boolean
  hasPrev?: boolean
}

// Search types
export type SearchConfig = {
  query: string
  fields?: string[]
  fuzzy?: boolean
  caseSensitive?: boolean
}

// Permission types
export type Permission = string
export type Role = string
export type PermissionCheck = (permission: Permission) => boolean
export type RoleCheck = (role: Role) => boolean

// Error types
export type ErrorCode = string
export type ErrorMessage = string
export type ErrorDetails = Record<string, any>
export type AppError = {
  code: ErrorCode
  message: ErrorMessage
  details?: ErrorDetails
  timestamp: DateTimeString
}

// File types
export type FileType = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other'
export type MimeType = string
export type FileSize = number // in bytes
export type FileInfo = {
  name: string
  size: FileSize
  type: MimeType
  lastModified: number
}

// Geolocation types
export type Coordinates = {
  latitude: number
  longitude: number
}
export type Address = {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}
export type Location = {
  coordinates: Coordinates
  address: Address
}

// Currency types
export type Currency = 'BRL' | 'USD' | 'EUR'
export type Money = {
  amount: number
  currency: Currency
}

// Language types
export type Locale = 'pt-BR' | 'en-US' | 'es-ES'
export type Translation = Record<string, string>
export type Translations = Record<Locale, Translation>

// Device types
export type DeviceType = 'mobile' | 'tablet' | 'desktop'
export type Platform = 'ios' | 'android' | 'web'
export type Browser = 'chrome' | 'firefox' | 'safari' | 'edge' | 'other'

// Network types
export type ConnectionType = 'wifi' | 'cellular' | 'ethernet' | 'unknown'
export type NetworkStatus = 'online' | 'offline'

// Storage types
export type StorageType = 'localStorage' | 'sessionStorage' | 'indexedDB' | 'memory'
export type StorageKey = string
export type StorageValue = any

// Analytics types
export type EventName = string
export type EventProperties = Record<string, any>
export type AnalyticsEvent = {
  name: EventName
  properties?: EventProperties
  timestamp: DateTimeString
  userId?: string
  sessionId?: string
}

// Feature flag types
export type FeatureFlag = string
export type FeatureFlagValue = boolean | string | number | object
export type FeatureFlags = Record<FeatureFlag, FeatureFlagValue>

// A/B testing types
export type ExperimentId = string
export type VariantId = string
export type ExperimentVariant = {
  id: VariantId
  name: string
  weight: number
  config: Record<string, any>
}
export type Experiment = {
  id: ExperimentId
  name: string
  variants: ExperimentVariant[]
  isActive: boolean
}

// Notification types
export type NotificationPermission = 'default' | 'granted' | 'denied'
export type NotificationAction = {
  action: string
  title: string
  icon?: string
}
export type NotificationOptions = {
  body?: string
  icon?: string
  badge?: string
  image?: string
  data?: any
  actions?: NotificationAction[]
  silent?: boolean
  requireInteraction?: boolean
  tag?: string
  renotify?: boolean
  timestamp?: number
  vibrate?: number[]
}

// WebSocket types
export type WebSocketState = 'connecting' | 'open' | 'closing' | 'closed'
export type WebSocketMessage<T = any> = {
  type: string
  payload: T
  timestamp: DateTimeString
}

// Cache types
export type CacheKey = string
export type CacheValue<T = any> = {
  data: T
  timestamp: DateTimeString
  ttl?: number
}
export type CacheStrategy = 'memory' | 'localStorage' | 'sessionStorage' | 'indexedDB'

// Queue types
export type QueueItem<T = any> = {
  id: string
  data: T
  priority?: number
  timestamp: DateTimeString
  retries?: number
  maxRetries?: number
}
export type QueueProcessor<T = any> = (item: QueueItem<T>) => Promise<void>

// State machine types
export type StateValue = string
export type StateContext = Record<string, any>
export type StateEvent = {
  type: string
  payload?: any
}
export type StateTransition = {
  from: StateValue
  to: StateValue
  event: string
  guard?: (context: StateContext, event: StateEvent) => boolean
  action?: (context: StateContext, event: StateEvent) => StateContext
}

// Workflow types
export type WorkflowStep = {
  id: string
  name: string
  type: 'manual' | 'automatic'
  condition?: (context: any) => boolean
  action?: (context: any) => Promise<any>
}
export type Workflow = {
  id: string
  name: string
  steps: WorkflowStep[]
  currentStep: string
  context: any
}

// Configuration types
export type ConfigValue = string | number | boolean | object | null
export type Config = Record<string, ConfigValue>
export type Environment = 'development' | 'staging' | 'production'

// Logging types
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'
export type LogEntry = {
  level: LogLevel
  message: string
  timestamp: DateTimeString
  context?: Record<string, any>
  error?: Error
}

// Metrics types
export type MetricName = string
export type MetricValue = number
export type MetricTags = Record<string, string>
export type Metric = {
  name: MetricName
  value: MetricValue
  tags?: MetricTags
  timestamp: DateTimeString
}

// Health check types
export type HealthStatus = 'healthy' | 'unhealthy' | 'degraded'
export type HealthCheck = {
  name: string
  status: HealthStatus
  message?: string
  timestamp: DateTimeString
  duration?: number
}

// Rate limiting types
export type RateLimit = {
  limit: number
  window: number // in seconds
  remaining: number
  resetTime: DateTimeString
}

// Backup types
export type BackupStatus = 'pending' | 'in_progress' | 'completed' | 'failed'
export type Backup = {
  id: string
  status: BackupStatus
  createdAt: DateTimeString
  completedAt?: DateTimeString
  size?: number
  error?: string
}

// Migration types
export type MigrationStatus = 'pending' | 'running' | 'completed' | 'failed' | 'rolled_back'
export type Migration = {
  id: string
  name: string
  version: string
  status: MigrationStatus
  appliedAt?: DateTimeString
  rolledBackAt?: DateTimeString
  error?: string
}

// Type guards
export const isString = (value: any): value is string => typeof value === 'string'
export const isNumber = (value: any): value is number => typeof value === 'number' && !isNaN(value)
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean'
export const isObject = (value: any): value is object => typeof value === 'object' && value !== null && !Array.isArray(value)
export const isArray = <T>(value: any): value is T[] => Array.isArray(value)
export const isFunction = (value: any): value is Function => typeof value === 'function'
export const isNull = (value: any): value is null => value === null
export const isUndefined = (value: any): value is undefined => value === undefined
export const isNullish = (value: any): value is null | undefined => value == null
export const isDefined = <T>(value: T | null | undefined): value is T => value != null
export const isEmpty = (value: any): boolean => {
  if (isNullish(value)) return true
  if (isString(value) || isArray(value)) return value.length === 0
  if (isObject(value)) return Object.keys(value).length === 0
  return false
}

// Type assertion helpers
export const assertString = (value: any, message = 'Expected string'): string => {
  if (!isString(value)) throw new Error(message)
  return value
}
export const assertNumber = (value: any, message = 'Expected number'): number => {
  if (!isNumber(value)) throw new Error(message)
  return value
}
export const assertBoolean = (value: any, message = 'Expected boolean'): boolean => {
  if (!isBoolean(value)) throw new Error(message)
  return value
}
export const assertObject = (value: any, message = 'Expected object'): object => {
  if (!isObject(value)) throw new Error(message)
  return value
}
export const assertArray = <T = any>(value: any, message = 'Expected array'): T[] => {
  if (!isArray<T>(value)) throw new Error(message)
  return value as T[]
}
export const assertFunction = (value: any, message = 'Expected function'): Function => {
  if (!isFunction(value)) throw new Error(message)
  return value
}
export const assertDefined = <T>(value: T | null | undefined, message = 'Expected defined value'): T => {
  if (!isDefined(value)) throw new Error(message)
  return value
}