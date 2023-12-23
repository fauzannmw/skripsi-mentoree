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
  course: Course[];
  course_day: Day[];
  description: string?;
};

type Course = {
  course: string?;
};

type Day = {
  day: string?;
};
