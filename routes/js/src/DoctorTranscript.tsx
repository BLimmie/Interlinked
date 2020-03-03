import React from 'react';
import { Typography } from '@material-ui/core';

interface DoctorTranscriptProps {
    transcriptList: string[]
}

export const DoctorTranscript: React.SFC<DoctorTranscriptProps> = (props) => {
  const {transcriptList } = props
    return (
        <div>
          {
            transcriptList.map((line: string) => {
              return <Typography>{line}</Typography>
            })
          }
        </div>
    )
}
