import styled from '@emotion/styled';
import { InputBase } from '@mui/material';


export const CustomInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    
    '& .MuiInputBase-input': {
      borderRadius: 0,
      position: 'relative',
      backgroundColor:'transparent',
      border: '1px solid',
      borderColor: '#757575',
      fontSize: 16,
      padding: '10px 12px',

    },
  }));