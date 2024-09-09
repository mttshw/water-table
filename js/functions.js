export const getTableData = async () => {
    
    return await fetch('../../river_sensor_data.json').then((response)=>{
        return response.json();
    }).then(data=>{
        const tableData = [];
        data.forEach(line => {
            const row = {}

            for (let item in line) {
                if( item == 'payload' ) {

                    const decode = atob(line[item]);
                    const payloadObject = JSON.parse(decode);

                    for( let payloadItem in payloadObject) {
                        
                        const value = payloadObject[payloadItem];

                        if( typeof value == 'object' ) {
                            let text = '';
                            for( let valueKey in value) {
                                text += value[valueKey];
                            }
                            row[payloadItem] = text;
                        } else {
                            row[payloadItem] = payloadObject[payloadItem];
                        }


                    }
                } else if ( item == 'transmittedAt') {
                    const date = new Date(line[item].iso);;

                    row[item] = date;
                } else {
                    row[item] = line[item];
                }
            }

            tableData.push(row);

        });

        return tableData;
    });
    
}