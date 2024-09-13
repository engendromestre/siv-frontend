import type React from "react"
import { useEffect, useState } from "react"
import type { CastMember } from "../../types/CastMembers"
import { initialState, useCreateCastMemberMutation } from "./castMembersSlice"
import { useSnackbar } from "notistack"
import { Box, Paper, Typography } from "@mui/material"
import { CastMembersForm } from "./components/CastMembersForm"

export function CastMembersCreate() {
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState)
  const [createCastMember, status] = useCreateCastMemberMutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCastMemberState({ ...castMemberState, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createCastMember(castMemberState)
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Cast member created successfully!", {
        variant: "success",
      })
    }
    if (status.error) {
      enqueueSnackbar("Failed to create cast member!", { variant: "error" })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Cast Member</Typography>
          </Box>
        </Box>

        <CastMembersForm
          castMember={castMemberState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
        />
      </Paper>
    </Box>
  )
}
