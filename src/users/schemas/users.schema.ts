import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum MaritalStatus {
    SINGLE = "Single",
    MARRIED = "Married",
    DIVORCED = "Divorced",
    WIDOW = "Widow"
}


@Schema({
    timestamps: true
})



export class User {
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    age: number;

    @Prop()
    country: string;

    @Prop()
    marital_status: MaritalStatus


}


export const UserSchema = SchemaFactory.createForClass(User)