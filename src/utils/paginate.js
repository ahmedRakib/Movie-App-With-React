import _  from 'lodash'

export function paginate (items, pageNumber, pageSize) {
    const itemIndex = (pageNumber - 1) * pageSize;

    return _(items) //will return a lodash object where we can perfrom slice, take operation together(in chain)
            .slice(itemIndex)
            .take(pageSize)
            .value();
}