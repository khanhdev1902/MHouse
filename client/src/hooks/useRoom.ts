import { useEffect, useState, useCallback } from 'react'
import { AxiosError } from 'axios'
import roomAPI from '@/apis/roomAPI'
import type { Room } from '@/types/Room'

export function useRoom() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const parseError = (err: unknown): string => {
    if (err instanceof AxiosError) {
      return err.response?.data?.message || err.message
    }
    return 'Unexpected error'
  }

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await roomAPI.getRooms()
      if (res?.data) {
        setRooms(res.data)
      }
    } catch (err) {
      setError(parseError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRooms()
  }, [fetchRooms])

  const createRoom = async (
    data: Room
    // data: Omit<Room, 'roomId' | 'createdAt' | 'updatedAt' | 'services' | 'amenities'>
  ) => {
    const res = await roomAPI.createRoom(data).catch((err) => {
      setError(parseError(err))
      return null
    })

    if (res) {
      setRooms((prev) => [...prev, res.data])
      return res.data.data
    }
    return null
  }

  const updateRoom = async (roomId: number, data: Partial<Room>) => {
    const res = await roomAPI.updateRoom(roomId, data).catch((err) => {
      setError(parseError(err))
      return null
    })

    if (res) {
      setRooms((prev) => prev.map((r) => (r.roomId === roomId ? res.data: r)))
      return res.data
    }
    return null
  }

  const deleteRoom = async (roomId: number) => {
    const res = await roomAPI.deleteRoom(roomId).catch((err) => {
      setError(parseError(err))
      return null
    })

    if (res) {
      setRooms((prev) => prev.filter((r) => r.roomId !== roomId))
      return true
    }
    return false
  }

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  }
}
