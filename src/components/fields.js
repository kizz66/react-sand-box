const GetFields = () => {
    const fields = [
        //    'request_type',
        'items.adm_div',
        // 'items.attribute_groups',
        'items.contact_groups',
        //    'items.flags',
        'items.address',
        'items.rubrics',
        'items.name_ex',
        //    'items.point',
        //    'items.geometry.centroid',
        //    'items.region_id',
        //    'items.external_content',
        'items.org',
        'items.group',
        //    'items.schedule',
        'items.ads.options',
        //    'items.stat',
        //    'items.reviews',
        //     'items.purpose',
        'search_type',
        'context_rubrics',
        //    'search_attributes',
        //     'widgets',
        //   'filters'
    ];
    return fields.join ( ',' )
};
export default GetFields;