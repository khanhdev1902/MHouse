/* eslint-disable @typescript-eslint/no-unused-vars */
// src/hooks/useServices.ts
import { useEffect, useState } from 'react'
import type { Service } from '@/types/Service'
import ServiceAPI from '@/apis/serviceAPI'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* ===== GET ALL ===== */
  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await ServiceAPI.getServices()
      setServices(res.data)
    } catch (err) {
      setError('Không thể tải danh sách dịch vụ')
    } finally {
      setLoading(false)
    }
  }

  /* ===== CREATE ===== */
  const createService = async (data: Omit<Service, 'serviceId'>) => {
    try {
      setLoading(true)
      await ServiceAPI.createService(data)
      await fetchServices()
    } catch (err) {
      setError('Không thể tạo dịch vụ')
    } finally {
      setLoading(false)
    }
  }

  /* ===== UPDATE ===== */
  const updateService = async (id: number, data: Partial<Service>) => {
    try {
      setLoading(true)
      await ServiceAPI.updateService(id, data)
      await fetchServices()
    } catch (err) {
      setError('Không thể cập nhật dịch vụ')
    } finally {
      setLoading(false)
    }
  }

  /* ===== DELETE ===== */
  const deleteService = async (id: number) => {
    try {
      setLoading(true)
      await ServiceAPI.deleteService(id)
      await fetchServices()
    } catch (err) {
      setError('Không thể xóa dịch vụ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
    createService,
    updateService,
    deleteService,
  }
}
