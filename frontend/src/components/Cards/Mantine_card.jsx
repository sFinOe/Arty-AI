import { IconHeart } from "@tabler/icons-react";
import { Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export function BadgeCard({ image, title, description, size, query }) {
  const { classes, theme } = useStyles();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} size="lg">
          {title}
        </Text>
        <Badge color="pink" variant="light">
          Poster
        </Badge>
      </Group>

      <Text size="sm" color="indigo">
        {size}
      </Text>
      {description.map((item, index) => (
        <Text size="sm" color="dimmed" key={index}>
          {item}
        </Text>
      ))}

      <a href={`/wizard/upload?sizeId=${query}`}>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          PLace an order now
        </Button>
      </a>
    </Card>
  );
}
