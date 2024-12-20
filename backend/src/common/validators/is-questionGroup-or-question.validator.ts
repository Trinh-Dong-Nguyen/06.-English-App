import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateQuestionDto } from "src/module/question/dto/create-question.dto";
import { SectionQuestionDto } from "src/module/section/dto/create-section.dto";

export function IsQuestionGroupOrQuestion(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isQuestionGroupOrQuestion",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          if (!Array.isArray(value)) return false;
        
          return value.every((item) => {
        
            if (item.questions) {
              // SectionQuestionDto validation
              const sectionInstance = plainToClass(SectionQuestionDto, item);
              return sectionInstance instanceof SectionQuestionDto && item.text && Array.isArray(item.questions);
            } else {
              // CreateQuestionDto validation
              const questionInstance = plainToClass(CreateQuestionDto, item);
              return questionInstance instanceof CreateQuestionDto && item.text && item.type && item.order;
            }
          });
        },
        defaultMessage(args: ValidationArguments) {
          return "Each item must be an instance of SectionQuestionDto or CreateQuestionDto";
        },
      },
    });
  };
}