export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type CardProps = {
  id: string?;
  nim: string?;
  name: string?;
  major: string?;
  image: string?;
  gender: string?;
  mentoring_location: Location[];
  course: Course[];
  course_day: Day[];
  description: string?;
};

type Location = {
  location: string;
};

type Course = {
  course: string?;
};

type Day = {
  day: string?;
  time: string;
};
