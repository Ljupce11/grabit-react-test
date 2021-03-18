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
  size: string
  last_modified: string
}

export interface ShowDeleteObjectModal {
  show: boolean,
  object: BucketObject | null
}