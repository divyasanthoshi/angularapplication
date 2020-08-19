export class FormsConstants {
    public static readonly baseUrl = '/forms';

    public static readonly url = {
        api : {
            getFormLookup : '/api/Form/Lookup',
            getFormsUrl: '/api/Form/Detail/UserId',
            putArchiveFormsUrl: '/api/Form/Archive'
        },
        page: {
            formTrackDetail: FormsConstants.baseUrl + '/detail'
        }
    };
}
