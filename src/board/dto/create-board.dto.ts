export class CreateBoardDto {
  title!: string;

  columns!: { [key: string]: string };
}
