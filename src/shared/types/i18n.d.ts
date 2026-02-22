import "i18next";
import type { CommonTranslationTypes } from "@/shared/i18n/types/common.types";
import type { ValidationTranslationTypes } from "@/shared/i18n/types/validation.types";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      common: CommonTranslationTypes;
      validation: ValidationTranslationTypes;
    };
  }
}
