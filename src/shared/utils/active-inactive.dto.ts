import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { BaseAppDTO } from "src/shared/utils/app-base.dto";
import { STATIC_MESSAGES } from "src/shared/utils/utility.const";

export class ActiveInActiveDto extends BaseAppDTO {

    @ApiProperty({
        required: true,
        example: true,
        type: Boolean,
    })
    @IsBoolean({
        message: STATIC_MESSAGES.BOOLEAN_TYPE('IsActive status')
    })
    @IsNotEmpty({
        message: STATIC_MESSAGES.REQUIRED('IsActive status')
    })
    isActive: boolean
}
