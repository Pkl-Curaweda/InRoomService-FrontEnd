import { Component } from 'vue'

interface RouteMetaType {
  title: string
  layout: Component
  icon: string
  label: string
}

export default interface RouteType {
  path: string
  component: Component
  meta: RouteMetaType
  name: string
}
