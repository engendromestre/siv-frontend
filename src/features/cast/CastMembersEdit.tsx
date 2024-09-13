import { Box, Paper, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { CastMember } from "../../types/CastMembers"
import {
    initialState,
    useGetCastMemberQuery,
    useUpdateCastMemberMutation,
} from "./castMembersSlice"
import { CastMembersForm } from "./components/CastMembersForm"

export function CastMembersEdit() {
  const id = useParams().id ?? ""
  const { data: castMember, isFetching } = useGetCastMemberQuery({ id })
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState)
  const [updateCastMember, status] = useUpdateCastMemberMutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCastMemberState({ ...castMemberState, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateCastMember(castMemberState)
  }

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data)
    }
  }, [castMember])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Cast member update successfully!", {
        variant: "success",
      })
    }
    if (status.error) {
      enqueueSnackbar("Failed to update cast member!", { variant: "error" })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Cast Member</Typography>
          </Box>
        </Box>

        <CastMembersForm
          castMember={castMemberState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isDisabled={isFetching || status.isLoading}
          isLoading={status.isLoading}
        />
      </Paper>
    </Box>
  )
}
