export interface Location {
  id: string
  name: string
}

export interface BucketFormData {
  name: string
  location: string
}

export interface Bucket {
  id: string
  name: string
  location: Location
}

export interface BucketObject {
  name: string
  date: string
  size: string
}