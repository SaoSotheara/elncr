import type { CrudController } from '@open-lens/nestjs-crud';
import { JobCandidateEntity } from './job-candidate.entity';
import { JobCandidateService } from './job-candidate.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { Get } from '@nestjs/common';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/user.entity';
import { Crud } from '@open-lens/nestjs-crud';
import { JobService } from '../job/job.service';

@Crud({
  model: {
    type: JobCandidateEntity,
  },
})
@RequiredAuth()
@ApiResource(JobCandidateEntity)
export class JobCandidateController
  implements CrudController<JobCandidateEntity>
{
  constructor(
    readonly service: JobCandidateService,
    private jobService: JobService
  ) {}

  @Get('/company-job')
  getJobCandidate(@CurrentUser() user: UserEntity) {
    return this.jobService.getJobCandidate(user);
  }
}
