import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationCertifyComponent } from './application-certify/application-certify.component';
import { ApplicationPeopleComponent } from './application-people/application-people.component';
import { ApplicationPersonnelprofileComponent } from './application-personnelprofile/application-personnelprofile.component';
import { ApplicationProviderprofileComponent } from './application-providerprofile/application-providerprofile.component';
import { ApplicationSubmitComponent } from './application-submit/application-submit.component';
import { ApplicationSubmittedComponent } from './application-submitted/application-submitted.component';
import { ApplicationSummaryComponent } from './application-summary/application-summary.component';
import { ApplicationComponent } from './application.component';
import { ApplicationOwnershipContainerComponent } from './containers/ownership-container/ownership-container.component';
import { ApplicationOwnershipIncorporatedComponent } from './application-ownership/application-ownership-incorporated/application-ownership-incorporated.component';
import { ApplicationOwnershipInfoComponent } from './application-ownership/application-ownership-info/application-ownership-info.component';
import { ApplicationOwnershipToggleComponent } from './application-ownership/application-ownership-toggle/application-ownership-toggle.component';
import { ApplicationOwnershipUnincorporatedComponent } from './application-ownership/application-ownership-unincorporated/application-ownership-unincorporated.component';
import { CertifyContainerComponent } from './containers/certify-container/certify-container.component';
import { PeopleContainerComponent } from './containers/people-container/people-container.component';
import { PersonnelprofileContainerComponent } from './containers/personnelprofile-container/personnelprofile-container.component';
import { ProviderprofileContainerComponent } from './containers/providerprofile-container/providerprofile-container.component';
import { SubmitContainerComponent } from './containers/submit-container/submit-container.component';
import { SummaryContainerComponent } from './containers/summary-container/summary-container.component';
import { SubmittedContainerComponent } from './containers/submitted-container/submitted-container.component';
import { ApplicationViewpersonnelComponent } from './application-viewpersonnel/application-viewpersonnel.component';
import { OwnershipPersonnelprofileContainerComponent } from './containers/ownership-personnelprofile-container/ownership-personnelprofile-container.component';
import { PeopleViewContainerComponent } from './containers/people-view-container/people-view-container.component';
import { ApplicationBusinesshoursComponent } from './application-businesshours/application-businesshours.component';
import { ApplicationServicesComponent } from './application-services/application-services.component';
import { ModuleAccessGuard } from '../_core/guards/module-access.guard';
import { PageAccessGuard } from '../_core/guards/page-access.guard';
import { ServicesContainerComponent } from './containers/services-container/services-container.component';
import { BusinesshoursContainerComponent } from './containers/businesshours-container/businesshours-container.component';
import { AttestationContainerComponent } from './containers/attestation-container/attestation-container.component';
import { ApplicationAttestationComponent } from './application-documents/application-attestation/application-attestation.component';
import { ApplicationChildAbuseReportingComponent } from './application-documents/application-childabusereporting/application-childabusereporting.component';
import { ChildAbuseReportingContainerComponent } from './containers/childabusereporting-container/childabusereporting-container.component';
import { ApplicationTrainingComponent } from './application-training/application-training.component';
import { ApplicationBgsComponent } from './application-bgs/application-bgs.component';
import { PersonnelprofiletabsContainerComponent } from './containers/personnelprofiletabs-container/personnelprofiletabs-container.component';
import { ApplicationSelfAttestationComponent } from './application-documents/application-selfattestation/application-selfattestation.component';
import { ApplicationDocumentsListComponent } from './application-documents/application-documentslist/application-documentslist.component';
import { DocumentsListContainerComponent } from './containers/documentslist-container/documentslist-container.component';
import { EmploymenthistoryContainerComponent } from './containers/employmenthistory-container/employmenthistory-container.component';
import { EmploymentdetailsContainerComponent } from './containers/employmentdetails-container/employmentdetails-container.component';
import { ApplicationEmploymentDetailsComponent } from './application-documents/application-employmentdetails/application-employmentdetails.component';
import { ApplicationZoningAttestationComponent } from './application-documents/application-zoningattestation/application-zoningattestation.component';
import { AuthGuard } from '../_core/guards/auth.guard';
import { ApplicationEmploymentHistoryComponent } from './application-documents/application-employmenthistory/application-employmenthistory.component';
import { AttachmentslistContainerComponent } from './containers/attachments-list-container/attachments-list-container.component';
import { AttachmentsListComponent } from '../_shared/components/Attachments/Attachments-list/attachments-list.component';
import { AttachmentComponent } from '../_shared/components/Attachments/Attachment/attachment.component';
import { DocumentsPeopleComponent } from '../_shared/components/documents-people/documents-people.component';
import { DocumentsPeopleContainerComponent } from './containers/documents-people-container/documents-people-container.component';
import { ApplicationViewemploymentdetailsComponent } from './application-documents/application-viewemploymentdetails/application-viewemploymentdetails.component';
import { ViewemploymentdetailsContainerComponent } from './containers/viewemploymentdetails-container/viewemploymentdetails-container.component';
import { ApplicationDocumentsComponent } from './application-documents/application-documents.component';
import { ApplicationViewattestationComponent } from './application-documents/application-viewattestation/application-viewattestation.component';
import { AttestationViewContainerComponent } from './containers/attestation-view-container/attestation-view-container.component';
import { ApplicationViewChildAbuseReportingComponent } from './application-documents/application-viewchildabusereporting/application-viewchildabusereporting.component';
import { ViewChildAbuseReportingContainerComponent } from './containers/viewchildabusereporting-container/viewchildabusereporting-container.component';
import { ZoningattestationContainerComponent } from './containers/zoningattestation-container/zoningattestation-container.component';
import { SelfAttestationContainerComponent } from './containers/selfattestation-container/selfattestation-container.component';
import { ViewSelfAttestationContainerComponent } from './containers/viewselfattestation-container/viewselfattestation-container.component';
import { ApplicationViewSelfAttestationComponent } from './application-documents/application-viewselfattestation/application-viewselfattestation.component';


// defining routes
const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    canActivateChild: [ModuleAccessGuard],
    children: [
      {
        path: '',
        redirectTo: 'providerprofile',
      },
      {
        path: 'providerprofile',
        component: ProviderprofileContainerComponent,
        data: { animation: 'ProviderprofileContainer' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'businesshours',
        component: BusinesshoursContainerComponent,
        data: { animation: 'BusinesshoursContainerComponent' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'services',
        component: ServicesContainerComponent,
        data: { animation: 'ServicesContainer' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'personnelprofile',
        component: PersonnelprofiletabsContainerComponent,
        data: { animation: 'PersonnelprofileContainer' },
        canActivate: [PageAccessGuard],

        children: [
          {
            path: 'profile',
            component: PersonnelprofileContainerComponent
          },
          {
            path: 'BGS',
            component: ApplicationBgsComponent
          },
          {
            path: 'training',
            component: ApplicationTrainingComponent
          },
          {
            path: '',
            redirectTo: 'profile'
          },
        ],
      },
      {
        path: 'people',
        children: [
          {
            path: '',
            component: PeopleContainerComponent,
            data: { animation: 'PeopleContainer' },
            canActivate: [PageAccessGuard]
          },
          {
            path: 'view',
            component: PeopleViewContainerComponent,
            data: { animation: 'PeopleViewContainer' },
            canActivate: [PageAccessGuard]
          },
          {
            path: 'create',
            component: PersonnelprofileContainerComponent,
            data: { animation: 'PersonnelprofileContainer' },
            canActivate: [PageAccessGuard],
          }
        ],
        canActivate: [PageAccessGuard]
      },
      {
        path: 'ownershipinfo',
        component: ApplicationOwnershipInfoComponent,
        canActivate: [PageAccessGuard]
      },
      {
        path: 'ownership',
        component: ApplicationOwnershipContainerComponent,
        data: { animation: 'ApplicationOwnershipContainer' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'ownershippersonnelprofile',
        component: OwnershipPersonnelprofileContainerComponent,
        data: { animation: 'OwnershipPersonnelprofileContainer' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'summary',
        component: SummaryContainerComponent,
        data: { animation: 'SummaryContainer' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'certify',
        component: CertifyContainerComponent,
        data: { animation: 'CertifyContainer' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'submit',
        component: SubmitContainerComponent,
        data: { animation: 'SubmitContainer' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'submitted',
        component: SubmittedContainerComponent,
        data: { animation: 'SubmittedContainer' },
        canActivate: [PageAccessGuard]
      },
      {
        path: 'documents',
        component: ApplicationDocumentsComponent,
        children: [
          {
            path: '',
            component: DocumentsListContainerComponent
          },
          {
            path: ':formTypeId/formfilers',
            component: DocumentsPeopleContainerComponent,
          },
          {
            path: 'AGMC/view',
            component: AttestationViewContainerComponent
          },
          {
            path: 'AGMC/edit',
            component: AttestationContainerComponent
          },
          {
            path: 'CANR/view',
            component: ViewChildAbuseReportingContainerComponent
          },
          {
            path: 'CANR/edit',
            component: ChildAbuseReportingContainerComponent
          },
          {
            path: 'EH',
            component: EmploymenthistoryContainerComponent
          },
          {
            path: 'EH/view',
            component: ViewemploymentdetailsContainerComponent
          },
          {
            path: 'EH/edit',
            component: EmploymentdetailsContainerComponent
          },
          {
            path: 'EH/create',
            component: EmploymentdetailsContainerComponent
          }
        ]
      },

      {
        path: 'zoningattestation',
        component: ZoningattestationContainerComponent
      },
      // Self Attestation
      {
        path: 'selfattestation',
        data: { animation: 'ServicesContainer' },
        canActivate: [PageAccessGuard],
        children: [
          {
            path: 'view',
            component: ViewSelfAttestationContainerComponent
          },
          {
            path: 'edit',
            component: SelfAttestationContainerComponent
          },
          {
            path: '',
            redirectTo: 'view'
          }
        ],
      },
      {
        path: 'attachmentslist',
        component: AttachmentslistContainerComponent
      },
      {
        path: '**',
        redirectTo: 'providerprofile'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {
  static components = [
    ApplicationComponent,
    ApplicationCertifyComponent,
    ApplicationOwnershipContainerComponent,
    ApplicationOwnershipIncorporatedComponent,
    ApplicationOwnershipInfoComponent,
    ApplicationOwnershipToggleComponent,
    ApplicationOwnershipUnincorporatedComponent,
    ApplicationPeopleComponent,
    ApplicationPersonnelprofileComponent,
    ApplicationProviderprofileComponent,
    ApplicationSubmitComponent,
    ApplicationSubmittedComponent,
    ApplicationSummaryComponent,
    CertifyContainerComponent,
    PeopleContainerComponent,
    PersonnelprofileContainerComponent,
    ProviderprofileContainerComponent,
    SubmitContainerComponent,
    SummaryContainerComponent,
    SubmittedContainerComponent,
    OwnershipPersonnelprofileContainerComponent,
    ApplicationViewpersonnelComponent,
    PeopleViewContainerComponent,
    ApplicationBusinesshoursComponent,
    ApplicationServicesComponent,
    ServicesContainerComponent,
    BusinesshoursContainerComponent,
    AttestationContainerComponent,
    ApplicationDocumentsComponent,
    ApplicationAttestationComponent,
    ApplicationChildAbuseReportingComponent,
    ChildAbuseReportingContainerComponent,
    ApplicationTrainingComponent,
    ApplicationBgsComponent,
    PersonnelprofiletabsContainerComponent,
    ApplicationSelfAttestationComponent,
    ApplicationDocumentsListComponent,
    DocumentsListContainerComponent,
    ApplicationEmploymentHistoryComponent,
    EmploymenthistoryContainerComponent,
    EmploymentdetailsContainerComponent,
    ApplicationEmploymentDetailsComponent,
    ApplicationZoningAttestationComponent,
    AttachmentslistContainerComponent,
    AttachmentsListComponent,
    AttachmentComponent,
    DocumentsPeopleComponent,
    DocumentsPeopleContainerComponent,
    ApplicationViewemploymentdetailsComponent,
    ViewemploymentdetailsContainerComponent,
    ApplicationViewChildAbuseReportingComponent,
    ViewChildAbuseReportingContainerComponent,
    ApplicationViewattestationComponent,
    AttestationViewContainerComponent,
    ZoningattestationContainerComponent,
    SelfAttestationContainerComponent,
    ViewSelfAttestationContainerComponent,
    ApplicationViewSelfAttestationComponent
  ];
}
