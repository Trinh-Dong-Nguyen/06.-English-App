import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidDOBConstraint implements ValidatorConstraintInterface {
  private errorMessage: string | null = null;

  validate(dateOfBirth: any, args: ValidationArguments) {
    if (!dateOfBirth) {
      this.errorMessage = 'Date of birth is required.';
      return false;
    }

    const dob = new Date(dateOfBirth);
    const today = new Date();

    if (isNaN(dob.getTime())) {
      this.errorMessage = 'Date of birth must be a valid date.';
      return false;
    }

    if (dob > today) {
      this.errorMessage = 'Date of birth cannot be in the future.';
      return false;
    }

    const age = this.calculateAge(dob);
    if (age < 8) {
      this.errorMessage = 'User must be at least 8 years old.';
      return false;
    }

    this.errorMessage = null;
    return true;
  }

  calculateAge(dob: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  defaultMessage(args: ValidationArguments) {
    return this.errorMessage || 'Date of birth is invalid.';
  }
}

export function IsValidDOB(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDOBConstraint,
    });
  };
}
