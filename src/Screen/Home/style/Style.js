const React = require("react-native");
const { Platform } = React;

export default  {
    layoutContent: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },

    homeBg: {
        flex: 1,
        paddingBottom: 30,
    },

    section: {
        flex: 1,
        paddingLeft: 0,
        alignItems: 'center',
        width: '100%',
    },
   
    item: {
        width: '100%', 
        flexDirection: 'column',
    },
    record: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e7e7e7',
        marginLeft: 0,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordLast: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        marginLeft: 0,
        paddingVertical: 10,
    },
    itemImg: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    itemInfo: {
        flex: 1,
        paddingHorizontal: 15,
    },
    itemTitle: {
        color: '#333',
        fontSize: 12,
        marginBottom: 0,
    },
    
    itemDesc: {
        color: '#666',
        fontSize: 11,
        marginBottom: 5,
        lineHeight: 16,
    },
    itemDate: {
        color: '#999',
        fontSize: 10,
    },
    crv: {
        borderRadius: 8,
    },
    col: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInputMulti: {
        fontFamily: 'Montserrat-Regular',
        borderBottomWidth: 0,
        borderColor: '#DDD',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 12,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        ...Platform.select({
          ios: {
            height: 100,
            paddingTop: 20,
          },
          android: {
            textAlignVertical: 'top',
          },
        }
    )},
 }