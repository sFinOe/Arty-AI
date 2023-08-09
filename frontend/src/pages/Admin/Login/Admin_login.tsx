import React from 'react';
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  rem,
} from '@mantine/core';
import {PostAdminLogin} from "api/auth";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

function Admin_login({setShowNavbar}) {
  setShowNavbar(false);
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const { classes } = useStyles();
  const [selected, setSelected] = React.useState(false);

  const handleLogin = () => {

    const data = {
      email: Email,
      password: Password
    }
    PostAdminLogin(data).then((res) => {
      if (res.status === 200) {
        console.log(res);
        console.log("Success");
        localStorage.setItem("jwtToken", res.body.token);
        window.location.replace("/admin/dashboard");
      } else {
        console.log("Error");
      }
    }
    ).catch((err) => {
      console.log(err);
    }
    )
    
  };
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Admin Dashboard
        </Title>
        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" value={Email} onChange={(e) => {setEmail(e.target.value)}} />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" value={Password} onChange={(e) => {setPassword(e.target.value)}} />
        <Checkbox label="Keep me logged in" mt="xl" size="md" value={selected}  onChange={() => {
                  setSelected(!selected);
                }}/>
        <Button fullWidth mt="xl" size="md" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </div>
  );
}

export default Admin_login;

