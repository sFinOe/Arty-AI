import {
	createStyles,
	Badge,
	Group,
	Title,
	Text,
	Card,
	SimpleGrid,
	Container,
	rem,
  } from '@mantine/core';
  import { IconHandClick, IconSunHigh, IconShieldHalfFilled } from '@tabler/icons-react';
  
  const mockdata = [
	{
	  title: 'User Friendly',
	  description:
		'User friendly interface that allows you to easily create and oder your canvas',
	  icon: IconHandClick,
	},
	{
	  title: 'High-Quality Canvas',
	  description:
		'High quality canvas made from the best materials and with the best printing technology available',
	  icon: IconSunHigh,
	},
	{
	  title: 'We Handle Shipping',
	  description:
		'Our shipping partners are the best in the business and we handle all the shipping for you',
	  icon: IconShieldHalfFilled,
	},
  ];
  
  const useStyles = createStyles((theme) => ({
	title: {
	  fontSize: rem(34),
	  fontWeight: 900,
  
	  [theme.fn.smallerThan('sm')]: {
		fontSize: rem(24),
	  },
	},
  
	description: {
	  maxWidth: 600,
	  margin: 'auto',
  
	  '&::after': {
		content: '""',
		display: 'block',
		backgroundColor: theme.fn.primaryColor(),
		width: rem(45),
		height: rem(2),
		marginTop: theme.spacing.sm,
		marginLeft: 'auto',
		marginRight: 'auto',
	  },
	},
  
	card: {
	  border: `${rem(1)} solid ${
		theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
	  }`,
	},
  
	cardTitle: {
	  '&::after': {
		content: '""',
		display: 'block',
		backgroundColor: theme.fn.primaryColor(),
		width: rem(45),
		height: rem(2),
		marginTop: theme.spacing.sm,
	  },
	},
  }));
  
  export function FeaturesCards() {
	const { classes, theme } = useStyles();
	const features = mockdata.map((feature) => (
	  <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
		<feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
		<Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
		  {feature.title}
		</Text>
		<Text fz="sm" c="dimmed" mt="sm">
		  {feature.description}
		</Text>
	  </Card>
	));
  
	return (
	  <Container size="lg" py="xl">
		<Group position="center">
		  <Badge variant="filled" size="lg">
			Best canvas ever
		  </Badge>
		</Group>
  
		<Title order={2} className={classes.title} ta="center" mt="sm">
		What makes our company stand out
		</Title>
  
		<Text c="dimmed" className={classes.description} ta="center" mt="md">
		  We are a company that is dedicated to providing the best canvas printing service
		  available. We have a team of experts that are dedicated to providing the best
		  customer service and the best quality canvas printing service.
		</Text>
  
		<SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
		  {features}
		</SimpleGrid>
	  </Container>
	);
  }