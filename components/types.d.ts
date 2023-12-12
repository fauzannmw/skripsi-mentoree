export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type CardProps = {
  nim: string?;
  name: string?;
  major: string?;
  image: string?;
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
