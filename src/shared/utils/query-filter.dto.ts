import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsString } from "class-validator";


export class QueryFilterDto {

    @ApiProperty({
        required: false,
        example: 1,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number = 0;

    @ApiProperty({
        required: false,
        example: 1,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 0;

    @ApiProperty({
        required: false,
        example: "Example String",
        type: String,
    })
    @IsOptional()
    @IsString()
    searchString?: string;
    
}