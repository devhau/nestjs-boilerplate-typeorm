import { DynamicModule } from "@nestjs/common";
import { AwsService } from "./aws.service";

export class AwsModule {
    public static register(): DynamicModule {
        return {
            module: AwsModule,
            providers: [AwsService],
            exports: [AwsService],
        };
    }
}